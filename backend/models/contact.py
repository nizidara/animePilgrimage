from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, SmallInteger, Text, Float
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

class RequestAnime(Base):
    __tablename__ = 'request_anime'
    
    request_anime_id = Column(Integer, primary_key=True, autoincrement=True, comment='AUTO_INCREMENT')
    anime_id = Column(Integer, ForeignKey('anime.anime_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    request_date = Column(DateTime, nullable=False, default='1970-01-01 00:00:00')
    request_type = Column(SmallInteger, nullable=False, default=0, comment='0:edit request, 1:delete request')
    title = Column(String(50), nullable=False, comment='Sequels are dealt with same title but side stories are dealt with other title')
    introduction = Column(String(200), nullable=True)
    contents = Column(Text, nullable=False)
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')

    anime = relationship("Anime", back_populates="request_anime")
    user = relationship("User", back_populates="request_anime")

    __table_args__ = (
        {'comment': 'edit or delete requests table for anime table'}
    )

class RequestPlace(Base):
    __tablename__ = 'request_places'
    
    request_place_id = Column(Integer, primary_key=True, autoincrement=True, comment='AUTO_INCREMENT')
    place_id = Column(String(32), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    request_date = Column(DateTime, nullable=False, default='1970-01-01 00:00:00')
    request_type = Column(SmallInteger, nullable=False, default=0, comment='0:edit request, 1:delete request')
    name = Column(String(30), nullable=False, comment='pilgimage place name')
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    comment = Column(String(200), nullable=True, comment='this column is used to describe a scene which appeared in anime and so on')
    region_id = Column(Integer, ForeignKey('regions.region_id', ondelete='NO ACTION', onupdate='CASCADE'), nullable=False, default=0, comment='FK')
    anime_id = Column(Integer, ForeignKey('anime.anime_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    contents = Column(Text, nullable=False)
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')

    place = relationship("Place", back_populates="request_places")
    region = relationship("Region", back_populates="request_places")
    anime = relationship("Anime", back_populates="request_places")
    user = relationship("User", back_populates="request_places")

    __table_args__ = (
        {'comment': 'edit or delete requests table for places table'}
    )

class DeleteComment(Base):
    __tablename__ = 'delete_comments'
    
    delete_comment_id = Column(Integer, primary_key=True, autoincrement=True, comment='AUTO_INCREMENT')
    comment_id = Column(String(32), ForeignKey('comments.comment_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    request_date = Column(DateTime, nullable=False, default='1970-01-01 00:00:00')
    contents = Column(Text, nullable=False)
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')

    comment = relationship("Comment", back_populates="delete_comments")
    user = relationship("User", back_populates="delete_comments")

    __table_args__ = (
        {'comment': 'delete requests table for comments table'}
    )