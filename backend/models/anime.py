from sqlalchemy import Column, Integer, String, SmallInteger, UniqueConstraint, ForeignKey, DateTime, Text
from sqlalchemy.dialects.mysql import VARBINARY
from sqlalchemy.orm import relationship
from database.db import Base

class Anime(Base):
    __tablename__ = 'anime'
    
    anime_id = Column(Integer, primary_key=True, autoincrement=True, comment='AUTO_INCREMENT')
    title = Column(String(50), nullable=False, comment='Sequels are dealt with same title but side stories are dealt with other title')
    kana = Column(String(200), nullable=False, comment='Japanese title kana')
    file_name = Column(String(200), nullable=True, comment='anime icon file name')
    introduction = Column(String(200), nullable=True)
    flag = Column(SmallInteger, nullable=False, default=2, comment='flag = 0: Do not display, flag = 1: Display, flag = 2: Waiting approval')

    places = relationship("Place", back_populates="anime", cascade="all, delete")
    favorite_anime = relationship("FavoriteAnime", back_populates="anime", cascade="all, delete")
    request_anime = relationship("RequestAnime", back_populates="anime", cascade="all, delete")
    request_places = relationship("RequestPlace", back_populates="anime", cascade="all, delete")
    
    __table_args__ = (
        UniqueConstraint('title', name='title_UNIQUE'),
        {'comment': 'anime title table'}
    )

class RequestAnime(Base):
    __tablename__ = 'request_anime'
    
    request_anime_id = Column(Integer, primary_key=True, autoincrement=True, comment='AUTO_INCREMENT')
    anime_id = Column(Integer, ForeignKey('anime.anime_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    request_date = Column(DateTime, nullable=False, default='1970-01-01 00:00:00')
    request_type = Column(SmallInteger, nullable=False, default=0, comment='0:edit request, 1:delete request')
    title = Column(String(50), nullable=False, comment='Sequels are dealt with same title but side stories are dealt with other title')
    file_name = Column(String(200), nullable=True, comment='anime icon file name')
    introduction = Column(String(200), nullable=True)
    contents = Column(Text, nullable=False)
    user_id = Column(VARBINARY(16), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')

    anime = relationship("Anime", back_populates="request_anime")
    user = relationship("User", back_populates="request_anime")

    __table_args__ = (
        {'comment': 'edit or delete requests table for anime table'}
    )
