from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from database.db import Base

class Range(Base):
    __tablename__ = 'ranges'
    
    range_id = Column(Integer, primary_key=True, nullable=False, comment='0:public, 1:non-public')
    range_name = Column(String(20), nullable=False, default='public')

    comments = relationship("Comment", back_populates="range")

    __table_args__ = (
        {'comment': 'the public range definition table'}
    )

class Comment(Base):
    __tablename__ = 'comments'
    
    comment_id = Column(String(32), primary_key=True, nullable=False, comment='this column is generated UUID')
    comment = Column(String(140), nullable=False, comment='limit 140 characters')
    comment_date = Column(DateTime, nullable=False, default='1970-01-01 00:00:00')
    range_id = Column(Integer, ForeignKey('ranges.range_id', ondelete='NO ACTION', onupdate='CASCADE'), nullable=False, default=0, comment='FK')
    place_id = Column(String(32), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')

    range = relationship("Range", back_populates="comments")
    place = relationship("Place", back_populates="comments")
    user = relationship("User", back_populates="comments")

    real_photos = relationship("RealPhoto", back_populates="comment")
    delete_comments = relationship("DeleteComment", back_populates="comment")

    __table_args__ = (
        {'comment': 'anyone can post comment and photo which he has been to spot'}
    )

class RealPhoto(Base):
    __tablename__ = 'real_photos'
    
    real_photo_id = Column(String(32), primary_key=True, nullable=False, comment='this column is generated UUID')
    file_name = Column(String(200), nullable=False, comment='real place photo file name')
    place_id = Column(String(32), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False, comment='FK')
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='SET NULL', onupdate='CASCADE'), nullable=True, comment='FK')
    comment_id = Column(String(32), ForeignKey('comments.comment_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=True, comment='FK')

    place = relationship("Place", back_populates="real_photos")
    user = relationship("User", back_populates="real_photos")
    comment = relationship("Comment", back_populates="real_photos")

    __table_args__ = (
        UniqueConstraint('file_name', name='file_name_UNIQUE'),
        {'comment': 'to refer real photo img file name'}
    )