from sqlalchemy import Column, Integer, String, ForeignKey, SmallInteger, Double, UniqueConstraint
from sqlalchemy.orm import relationship
from database.db import Base

class Region(Base):
    __tablename__ = 'regions'
    
    region_id = Column(Integer, primary_key=True, nullable=False, comment='this column is region id if Japan is 000, prefectures are 001 to 047 and abroad is 100')
    region_name = Column(String(20), nullable=False, comment='this column is region name')

    places = relationship("Place", back_populates="region")
    #request_places = relationship("RequestPlace", back_populates="region")

    __table_args__ = (
        {'comment': 'regions name table'}
    )

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

    anime_photos = relationship("AnimePhoto", back_populates="place")
    place_icons = relationship("PlaceIcon", back_populates="place")
    comments = relationship("Comment", back_populates="place")
    real_photos = relationship("RealPhoto", back_populates="place")
    #request_places = relationship("RequestPlace", back_populates="place")
    archives = relationship("Archive", back_populates="place")

    # 要確認
    #created_user = relationship("User", foreign_keys=[created_user_id])
    #edited_user = relationship("User", foreign_keys=[edited_user_id])

    __table_args__ = (
        {'comment': 'pilgrimage places table'}
    )

class AnimePhoto(Base):
    __tablename__ = 'anime_photos'
    
    anime_photo_id = Column(String(32), primary_key=True, nullable=False, comment='this column is generated UUID')
    file_name = Column(String(200), nullable=False, comment='real place photo file name')
    place_id = Column(String(32), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')

    place = relationship("Place", back_populates="anime_photos")
    user = relationship("User", back_populates="anime_photos")

    place_icons = relationship("PlaceIcon", back_populates="anime_photo")

    __table_args__ = (
        UniqueConstraint('file_name', name='file_name_UNIQUE'),
        {'comment': 'to refer anime scene img file name'}
    )

class PlaceIcon(Base):
    __tablename__ = 'place_icons'
    
    place_id = Column(String(32), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, comment='FK')
    anime_photo_id = Column(String(32), ForeignKey('anime_photos.anime_photo_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=True, comment='FK')

    place = relationship("Place", back_populates="place_icons")
    anime_photo = relationship("AnimePhoto", back_populates="place_icons")

    __table_args__ = (
        {'comment': 'to set place icon'}
    )