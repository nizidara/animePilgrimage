from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

user="root"
password="GYn598PPpsqu"
mysqlIp="localhost"
database="animepilgrimage"

DB_URL = "mysql+pymysql://"+ user + ":" + password + "@" + mysqlIp + ":3306/" + database + "?charset=utf8"

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush = False, bind = engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()