from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.db import Base

class Region(Base):
    __tablename__ = 'regions'
    
    region_id = Column(Integer, primary_key=True, nullable=False, comment='this column is region id if Japan is 000, prefectures are 001 to 047 and abroad is 100')
    region_name = Column(String(20), nullable=False, comment='this column is region name')

    places = relationship("Place", back_populates="region")
    request_places = relationship("RequestPlace", back_populates="region")

    __table_args__ = (
        {'comment': 'regions name table'}
    )