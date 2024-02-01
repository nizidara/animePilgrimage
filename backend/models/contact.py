from sqlalchemy import Column, Integer, String

from database.db import Base


class Testcontact(Base):
    __tablename__ = "testcontact"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    name = Column(String(20), index=True, nullable=False)
    email = Column(String(45), index=True, nullable=False)
    title = Column(String(45), index=True, nullable=False)
    contents = Column(String(10000), nullable=False)