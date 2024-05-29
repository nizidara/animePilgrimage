from sqlalchemy import Column, String, Integer, CHAR, Date, DateTime, ForeignKey, UniqueConstraint, Index, SmallInteger, ForeignKeyConstraint
from sqlalchemy.orm import relationship
from database.db import Base

class UserAttribute(Base):
    __tablename__ = 'user_attributes'
    
    user_attribute_id = Column(Integer, primary_key=True, nullable=False, default=0, comment='0 = not user, 1 = admin, 2 = normal member, 10 = special member(tmp), 99=others')
    user_attribute_name = Column(String(20), nullable=False, default='non-member')
    
    users = relationship("User", back_populates="user_attribute")

    __table_args__ = (
        {'comment': 'user attribute definition table'}
    )

class User(Base):
    __tablename__ = 'users'
    
    user_id = Column(String(32), primary_key=True, nullable=False, comment='this column is generated UUID')
    user_name = Column(String(20), nullable=False, default='no name')
    login_id = Column(String(20), nullable=False, comment='UK, this column is used to login function.')
    email = Column(String(256), nullable=True)
    password = Column(CHAR(64), nullable=False, comment='this column is saved hash value which is used SHA-256')
    error_count = Column(Integer, nullable=False, default=0, comment='this column is saved error count which is entered mistake password')
    login_date = Column(Date, nullable=False, comment='this column is last login date or delete date')
    flag = Column(SmallInteger, nullable=True, default=1, comment='if flag = false, this user can not use, flag = 2, this user is waiting approval, flag = 3, this user is lock due to password error count over')
    user_attribute_id = Column(Integer, ForeignKey('user_attributes.user_attribute_id', ondelete='NO ACTION', onupdate='CASCADE'), nullable=True, comment='FK')

    user_attribute = relationship("UserAttribute", back_populates="users")

    comments = relationship("Comment", back_populates="user")
    real_photos = relationship("RealPhoto", back_populates="user")
    anime_photos = relationship("AnimePhoto", back_populates="user")
    request_anime = relationship("RequestAnime", back_populates="user")
    #request_places = relationship("RequestPlace", back_populates="user")
    delete_comments = relationship("DeleteComment", back_populates="user")
    contacts = relationship("Contact", back_populates="user")
    reset_users = relationship("ResetUser", back_populates="user")
    favorite_anime = relationship("FavoriteAnime", back_populates="user")
    archives = relationship("Archive", back_populates="user")
    
    # 要確認
    #place_create_users = relationship("Place", back_populates="user")
    #place_edit_users = relationship("Place", back_populates="user")

    __table_args__ = (
        UniqueConstraint('login_id', name='file_name_UNIQUE'),
        Index('file_name_UNIQUE', 'login_id'),
        {'comment': 'registered user table'}
    )

class ResetUser(Base):
    __tablename__ = 'reset_users'
    
    reset_user_id = Column(String(32), primary_key=True, nullable=False, comment='this column is generated UUID')
    user_id = Column(String(32), nullable=False, comment='FK')
    login_id = Column(String(20), nullable=False, comment='FK')
    email = Column(String(256), nullable=False, comment='user enter email when he forget password or login_id')
    password = Column(CHAR(64), nullable=False, comment='this column is saved hash value tmp password which is used SHA-256')
    issue_date = Column(DateTime, nullable=False, comment='this column is last login date or delete date')
    flag = Column(SmallInteger, nullable=True, default=1, comment='if flag = false, this tmp password can not use, flag = true, this tmp password is waiting approval')

    user = relationship("User", back_populates="reset_users")

    __table_args__ = (
        ForeignKeyConstraint(
            ['user_id', 'login_id'],
            ['users.user_id', 'users.login_id'],
            ondelete='CASCADE',
            onupdate='CASCADE',
        ),
        {'comment': 'to reset password table'}
    )

class FavoriteAnime(Base):
    __tablename__ = 'favorite_anime'
    
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, comment='FK')
    anime_id = Column(Integer, ForeignKey('anime.anime_id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, comment='FK')

    user = relationship("User", back_populates="favorite_anime")
    anime = relationship("Anime", back_populates="favorite_anime")

    __table_args__ = (
        {'comment': 'this table is associative entity. it is used to be connected who likes which animation'}
    )

class Archive(Base):
    __tablename__ = 'archives'
    
    user_id = Column(String(32), ForeignKey('users.user_id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, comment='FK')
    place_id = Column(String(32), ForeignKey('places.place_id', ondelete='CASCADE', onupdate='CASCADE'), primary_key=True, nullable=False, comment='FK')
    flag = Column(SmallInteger, nullable=False, default=0, comment='if false = want to go, true = have been to')

    user = relationship("User", back_populates="archives")
    place = relationship("Place", back_populates="archives")

    __table_args__ = (
        {'comment': 'this table is associative entity. it is used to be connected who wants to go or has been to which spot'}
    )