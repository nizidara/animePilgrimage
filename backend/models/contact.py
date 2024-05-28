from sqlalchemy import Column, Integer, String, DateTime

from database.db import Base

"""
class Testcontact(Base):
    __tablename__ = "testcontact"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name = Column(String(20), index=True, nullable=False)
    email = Column(String(45), index=True, nullable=False)
    title = Column(String(45), index=True, nullable=False)
    contents = Column(String(10000), nullable=False)
"""
    
class Contact(Base):
    __tablename__ = "contacts"

    contact_id = Column(Integer, primary_key=True, index=True, nullable=False)
    contact_date = Column(DateTime, index=True, nullable=False)
    name = Column(String(20), index=True, nullable=False)
    email = Column(String(45), index=True, nullable=False)
    title = Column(String(45), index=True, nullable=False)
    contents = Column(String(10000), nullable=False)
    status = Column(Integer, index=True, nullable=False)
    user_id = Column(String, index=True, nullable=True)