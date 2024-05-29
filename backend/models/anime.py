from sqlalchemy import Column, Integer, String, SmallInteger, UniqueConstraint
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

    places = relationship("Place", back_populates="anime")
    favorite_anime = relationship("FavoriteAnime", back_populates="anime")
    request_anime = relationship("RequestAnime", back_populates="anime")
    request_places = relationship("RequestPlace", back_populates="anime")
    
    __table_args__ = (
        UniqueConstraint('title', name='title_UNIQUE'),
        {'comment': 'anime title table'}
    )