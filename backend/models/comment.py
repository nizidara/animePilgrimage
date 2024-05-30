from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
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