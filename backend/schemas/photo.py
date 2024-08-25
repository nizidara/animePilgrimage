from pydantic import BaseModel

from typing import Optional, List

class AnimeIconCreate(BaseModel):
    file_name: Optional[str] = ""

    class Config:
        orm_mode = True

class AnimeIconResponse(AnimeIconCreate):
    anime_id: int
    title: str

    class Config:
        orm_mode = True

class PlacePhotoIconCreate(BaseModel):
    anime_photo_id: str
    place_id: Optional[str] = None

    class Config:
        orm_mode = True

class PlacePhotoIconResponse(PlacePhotoIconCreate):
    place_id: str
    file_name: str
    place_name: str

    class Config:
        orm_mode = True

class AnimePhotoCreate(BaseModel):
    file_names: List[str]
    place_id: str
    user_id: Optional[str] = None

    class Config:
        orm_mode = True

class AnimePhotoResponse(BaseModel):
    file_name: str
    place_id: str
    user_id: Optional[str] = None
    anime_photo_id: str
    place_name: str
    anime_id: int
    anime_title: str
    user_name: Optional[str] = "no name"

    class Config:
        orm_mode = True

class RealPhotoCreate(BaseModel):
    file_names: List[str]
    place_id: str
    comment_id: Optional[str] = None
    user_id: Optional[str] = None
    
    class Config:
        orm_mode = True

class RealPhotoResponse(BaseModel):
    file_name: str
    place_id: str
    comment_id: Optional[str] = None
    user_id: Optional[str] = None
    real_photo_id: str
    place_name: str
    anime_id: int
    anime_title: str
    user_name: Optional[str] = "no name"
    
    class Config:
        orm_mode = True