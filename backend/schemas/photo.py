from pydantic import BaseModel

from typing import Optional

class PhotoBase(BaseModel):
    file_name: str

class AnimeIconCreate(PhotoBase):
    file_name: Optional[str]

    class Config:
        orm_mode = True

class AnimeIconResponse(AnimeIconCreate):
    anime_id: int

    class Config:
        orm_mode = True

class PlacePhotoIconCreate(BaseModel):
    anime_photo_id: str
    place_id: Optional[str]

    class Config:
        orm_mode = True

class PlacePhotoIconResponse(PlacePhotoIconCreate):
    place_id: str

    class Config:
        orm_mode = True

class PlacePhotoCreateBase(PhotoBase):
    place_id: str
    user_id: Optional[str]

    class Config:
        orm_mode = True

class AnimePhotoCreate(PlacePhotoCreateBase):
    pass

    class Config:
        orm_mode = True

class AnimePhotoResponse(AnimePhotoCreate):
    anime_photo_id: str

    class Config:
        orm_mode = True

class RealPhotoCreate(PlacePhotoCreateBase):
    comment_id: Optional[str]
    
    class Config:
        orm_mode = True

class RealPhotoResponse(RealPhotoCreate):
    real_photo_id: str
    
    class Config:
        orm_mode = True