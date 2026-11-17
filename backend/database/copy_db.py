"""Copy every table (schema + data) from one MySQL-compatible DB to another, then verify.

Written for the MariaDB (AWS RDS) -> TiDB Cloud move. The source is only read
(read-only transaction, one consistent snapshot); nothing is ever written to it.

Usage (from backend/):
    python database/copy_db.py            # destination must have no tables
    python database/copy_db.py --reset    # drop the destination tables first (re-run)

Settings are read from .env:
    SRC_DB_USER / SRC_DB_PASSWORD / SRC_DB_HOST / SRC_DB_NAME   copy from
    DST_DB_USER / DST_DB_PASSWORD / DST_DB_HOST / DST_DB_NAME   copy to
    SRC_DB_SSL / DST_DB_SSL    true if the server requires TLS (TiDB Cloud does)
HOST may include a port, e.g. "gateway01.xxx.tidbcloud.com:4000".
"""
import argparse
import os
import re
import ssl
import sys
from graphlib import TopologicalSorter

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL

BATCH_SIZE = 500


def make_engine(prefix):
    try:
        user, password, host_port, database = (
            os.environ[f"{prefix}_DB_{key}"] for key in ("USER", "PASSWORD", "HOST", "NAME")
        )
    except KeyError as e:
        sys.exit(f"{e.args[0]} is not set in .env")
    host, _, port = host_port.partition(":")
    url = URL.create(
        "mysql+pymysql",
        username=user,
        password=password,
        host=host,
        port=int(port) if port else None,
        database=database,
        query={"charset": "utf8mb4"},
    )
    use_ssl = os.getenv(f"{prefix}_DB_SSL", "false").lower() == "true"
    return create_engine(url, connect_args={"ssl": ssl.create_default_context()} if use_ssl else {})


def scalars(conn, sql):
    return [row[0] for row in conn.exec_driver_sql(sql)]


def table_order(src, tables):
    """Parents before children, so foreign keys can be created as-is."""
    sorter = TopologicalSorter({table: set() for table in tables})
    for child, parent in src.exec_driver_sql(
        "SELECT TABLE_NAME, REFERENCED_TABLE_NAME FROM information_schema.REFERENTIAL_CONSTRAINTS"
        " WHERE CONSTRAINT_SCHEMA = DATABASE()"
    ):
        if child != parent:
            sorter.add(child, parent)
    return list(sorter.static_order())


def convert_ddl(ddl, dst_is_tidb):
    # MariaDB-only UCA 14 collations -> the closest MySQL 8 / TiDB ones (UCA 9)
    ddl = re.sub(r"\b(?:utf8mb[34]_)?uca1400_(\w+)", r"utf8mb4_0900_\1", ddl)
    # legacy 3-byte utf8 -> utf8mb4 (a superset)
    ddl = re.sub(r"\butf8(?:mb3)?(?=_|\b)", "utf8mb4", ddl)
    if dst_is_tidb and "AUTO_INCREMENT" in ddl:
        # keep ids consecutive like MySQL; TiDB otherwise hands them out in jumps of 30000
        ddl += " AUTO_ID_CACHE 1"
    return ddl


def fetch_rows(conn, table):
    result = conn.exec_driver_sql(f"SELECT * FROM `{table}`")
    return list(result.keys()), [tuple(row) for row in result]


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--reset", action="store_true", help="drop the destination tables before copying")
    args = parser.parse_args()

    load_dotenv()
    src_engine, dst_engine = make_engine("SRC"), make_engine("DST")
    if (src_engine.url.host, src_engine.url.port, src_engine.url.database) == (
        dst_engine.url.host, dst_engine.url.port, dst_engine.url.database
    ):
        sys.exit("SRC and DST point at the same database")

    with src_engine.connect() as src, dst_engine.connect() as dst:
        src.exec_driver_sql("SET SESSION TRANSACTION READ ONLY")
        src.exec_driver_sql("START TRANSACTION WITH CONSISTENT SNAPSHOT")

        # ---- preflight ---------------------------------------------------
        versions = [scalars(conn, "SELECT VERSION()")[0] for conn in (src, dst)]
        dst_is_tidb = "tidb" in versions[1].lower()
        print(f"source     : {versions[0]}  ({src_engine.url.host}/{src_engine.url.database})")
        print(f"destination: {versions[1]}  ({dst_engine.url.host}/{dst_engine.url.database})")

        clocks = [scalars(conn, "SELECT NOW()")[0] for conn in (src, dst)]
        if abs((clocks[0] - clocks[1]).total_seconds()) > 60:
            print(f"WARNING: NOW() differs (source {clocks[0]}, destination {clocks[1]}):"
                  " the servers use different time zones, so DEFAULT CURRENT_TIMESTAMP values will shift")

        modes = [set(scalars(conn, "SELECT @@sql_mode")[0].split(",")) - {""} for conn in (src, dst)]
        if modes[0] != modes[1]:
            print(f"NOTE: sql_mode differs. only on source: {sorted(modes[0] - modes[1])},"
                  f" only on destination: {sorted(modes[1] - modes[0])}")

        tables = scalars(src, "SELECT TABLE_NAME FROM information_schema.TABLES"
                              " WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'")
        not_copied = (
            scalars(src, "SELECT CONCAT('view ', TABLE_NAME) FROM information_schema.VIEWS"
                         " WHERE TABLE_SCHEMA = DATABASE()")
            + scalars(src, "SELECT CONCAT('trigger ', TRIGGER_NAME) FROM information_schema.TRIGGERS"
                           " WHERE TRIGGER_SCHEMA = DATABASE()")
            + scalars(src, "SELECT CONCAT(LOWER(ROUTINE_TYPE), ' ', ROUTINE_NAME) FROM information_schema.ROUTINES"
                           " WHERE ROUTINE_SCHEMA = DATABASE()")
        )
        if not_copied:
            print(f"WARNING: these source objects are NOT copied: {not_copied}")

        ddls = {
            table: convert_ddl(src.exec_driver_sql(f"SHOW CREATE TABLE `{table}`").one()[1], dst_is_tidb)
            for table in table_order(src, tables)
        }
        used_collations = set(re.findall(r"COLLATE[ =](\w+)", "\n".join(ddls.values())))
        unsupported = used_collations - set(scalars(dst, "SHOW COLLATION"))
        if unsupported:
            sys.exit(f"destination does not support collation(s) {sorted(unsupported)}")
        print(f"collations : {sorted(used_collations)}")

        # ---- destination schema ------------------------------------------
        dst.exec_driver_sql("SET SESSION foreign_key_checks = 0")
        # keep explicit 0 ids (e.g. region_id 0) instead of treating them as "generate a new id"
        dst.exec_driver_sql("SET SESSION sql_mode = CONCAT(@@sql_mode, ',NO_AUTO_VALUE_ON_ZERO')")

        existing = scalars(dst, "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()")
        if existing and not args.reset:
            sys.exit(f"destination already has tables {existing}; re-run with --reset to drop them")
        for table in existing:
            dst.exec_driver_sql(f"DROP TABLE `{table}`")

        for table, ddl in ddls.items():
            try:
                # the driver %-formats every statement, so a literal % (e.g. in a comment) must be doubled
                dst.exec_driver_sql(ddl.replace("%", "%%"))
            except Exception:
                print(f"\nCREATE TABLE failed for `{table}`:\n{ddl}\n", file=sys.stderr)
                raise

        # ---- data --------------------------------------------------------
        mismatched = []
        for table in ddls:
            columns, rows = fetch_rows(src, table)
            insert = "INSERT INTO `{}` ({}) VALUES ({})".format(
                table, ", ".join(f"`{c}`" for c in columns), ", ".join(["%s"] * len(columns))
            )
            for start in range(0, len(rows), BATCH_SIZE):
                dst.exec_driver_sql(insert, rows[start:start + BATCH_SIZE])
            dst.commit()

            # read everything back and compare value by value
            dst_columns, dst_rows = fetch_rows(dst, table)
            ok = dst_columns == columns and sorted(dst_rows, key=repr) == sorted(rows, key=repr)
            if not ok:
                mismatched.append(table)
            print(f"  {table:<24}{len(rows):>8} rows  {'OK' if ok else 'MISMATCH'}")

    if mismatched:
        sys.exit(f"\nFAILED: destination differs from source in {mismatched}")
    print(f"\nDone: {len(ddls)} tables copied and verified.")


if __name__ == "__main__":
    main()
