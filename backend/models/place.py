from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, SmallInteger, Text, Float, Double
from sqlalchemy.orm import relationship
from database.db import Base

class Place(Base):
    __tablename__ = 'places'
    
    place_id = Column(String(32), primary_key=True, nullable=False, comment='this column is generated UUID')
    name = Column(String(30), nullable=False, comment='pilgrimage place name')
    latitude = Column(Double, nullable=False)
    longitude = Column(Double, nullable=False)
    comment = Column(String(200), nullable=True, comment='this column is used to describe a scene which appeared in anime and so on')
    flag = Column(SmallInteger, nullable=True, default=2, comment='flag = 0: Do not display, flag = 1: Display, flag = 2: Waiting approval')
    region_id = Column(Integer, ForeignKey('regions.region_id', ondelete='NO ACTION', onupdate='CASCADE'), nullable=False, default=0, comment='FK')
    anime_id = Column(Integer, ForeignKey('anime.anime_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    created_user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='this column is FK, and it used when to create delete function')
    edited_user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')

    region = relationship("Region", back_populates="places")
    anime = relationship("Anime", back_populates="places")
    created_user = relationship("User", foreign_keys="[Place.created_user_id]", back_populates="created_places")
    edited_user = relationship("User", foreign_keys="[Place.edited_user_id]", back_populates="edited_places")

    anime_photos = relationship("AnimePhoto", back_populates="place")
    place_icons = relationship("PlaceIcon", back_populates="place")
    comments = relationship("Comment", back_populates="place")
    real_photos = relationship("RealPhoto", back_populates="place")
    request_places = relationship("RequestPlace", back_populates="place")
    archives = relationship("Archive", back_populates="place")

    __table_args__ = (
        {'comment': 'pilgrimage places table'}
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