from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, SmallInteger
from sqlalchemy.orm import relationship
from database.db import Base
import datetime

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
    __tablename__ = 'contacts'
    
    contact_id = Column(Integer, primary_key=True, autoincrement=True, comment='AUTO_INCREMENT')
    contact_date = Column(DateTime, nullable=False, default=datetime.datetime(1970, 1, 1, 0, 0, 0))
    name = Column(String(20), nullable=False)
    email = Column(String(256), nullable=False)
    title = Column(String(100), nullable=False)
    contents = Column(String(10000), nullable=False)
    status = Column(SmallInteger, nullable=False, default=0, comment='0:not checked, 1: now checking, 2:done')
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK, if null is non-member')

    user = relationship("User", back_populates="contacts")

    __table_args__ = (
        {'comment': 'to save contacts contents'}
    )
