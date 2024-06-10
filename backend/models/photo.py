from sqlalchemy import Column, String, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.mysql import VARBINARY
from sqlalchemy.orm import relationship
from database.db import Base
import uuid

class RealPhoto(Base):
    __tablename__ = 'real_photos'
    
    real_photo_id = Column(VARBINARY(16), primary_key=True, default=lambda: uuid.uuid4().bytes, nullable=False, comment='this column is generated UUID')
    file_name = Column(String(200), nullable=False, comment='real place photo file name')
    place_id = Column(VARBINARY(16), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    user_id = Column(VARBINARY(16), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')
    comment_id = Column(VARBINARY(16), ForeignKey('comments.comment_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=True, comment='FK')

    place = relationship("Place", back_populates="real_photos")
    user = relationship("User", back_populates="real_photos")
    comment = relationship("Comment", back_populates="real_photos")

    __table_args__ = (
        UniqueConstraint('file_name', name='file_name_UNIQUE'),
        {'comment': 'to refer real photo img file name'}
    )

class AnimePhoto(Base):
    __tablename__ = 'anime_photos'
    
    anime_photo_id = Column(VARBINARY(16), primary_key=True, default=lambda: uuid.uuid4().bytes, nullable=False, comment='this column is generated UUID')
    file_name = Column(String(200), nullable=False, comment='real place photo file name')
    place_id = Column(VARBINARY(16), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    user_id = Column(VARBINARY(16), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')

    place = relationship("Place", back_populates="anime_photos")
    user = relationship("User", back_populates="anime_photos")

    place_icons = relationship("PlaceIcon", back_populates="anime_photo")

    __table_args__ = (
        UniqueConstraint('file_name', name='file_name_UNIQUE'),
        {'comment': 'to refer anime scene img file name'}
    )

class PlaceIcon(Base):
    __tablename__ = 'place_icons'
    
    place_id = Column(VARBINARY(16), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, comment='FK')
    anime_photo_id = Column(VARBINARY(16), ForeignKey('anime_photos.anime_photo_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=True, comment='FK')

    place = relationship("Place", back_populates="place_icons")
    anime_photo = relationship("AnimePhoto", back_populates="place_icons")

    __table_args__ = (
        {'comment': 'to set place icon'}
    )