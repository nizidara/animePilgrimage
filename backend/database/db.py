from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import ssl

from properties.properties import DB_URL, db_ssl

# verify the server certificate and hostname against the system CA store
connect_args = {"ssl": ssl.create_default_context()} if db_ssl else {}

engine = create_engine(
    DB_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
    connect_args=connect_args,
)

SessionLocal = sessionmaker(autocommit=False, autoflush = False, bind = engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()