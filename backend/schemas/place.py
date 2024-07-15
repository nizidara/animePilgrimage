from typing import Optional
from datetime import datetime

from pydantic import BaseModel

class PlaceBase(BaseModel):
    anime_id: int
    name: str
    latitude: float
    longitude: float
    comment: Optional[str] = ""

class PlaceCreate(PlaceBase):
    flag: int
    region_id: int
    created_user_id: Optional[str] = None
    edited_user_id: Optional[str] = None

    class Config:
        orm_mode = True

class PlaceResponse(PlaceCreate):
    place_id: str
    region_name: str
    anime_title: str
    created_user_name: Optional[str] = "no name"
    edited_user_name: Optional[str] = "no name"

    class Config:
        orm_mode = True

class PlaceRequestCreate(PlaceBase):
    place_id: str
    request_date: datetime
    request_type: int
    region_id: int
    contents: str
    user_id: Optional[str] = None

    class Config:
        orm_mode = True

class PlaceRequestResponse(PlaceRequestCreate):
    request_place_id: int
    region_name: str
    anime_title: str
    user_name: Optional[str] = "no name"

    class Config:
        orm_mode = True