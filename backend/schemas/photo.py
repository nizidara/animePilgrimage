from pydantic import BaseModel

from typing import Optional

class PhotoBase(BaseModel):
    file_name: str

class AnimeIconCreate(BaseModel):
    anime_id: int

    class Config:
        orm_mode = True

class AnimeIconResponse(AnimeIconCreate):
    pass

    class Config:
        orm_mode = True

class PlacePhotoBase(PhotoBase):
    place_id: str

    class Config:
        orm_mode = True

class PlacePhotoIconCreate(PlacePhotoBase):
    pass

    class Config:
        orm_mode = True

class PlacePhotoIconResponse(PlacePhotoBase):
    pass

    class Config:
        orm_mode = True

class PlacePhotoCreateBase(PlacePhotoBase):
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

class RealPhotoCreate(RealPhotoCreate):
    real_photo_id: str
    
    class Config:
        orm_mode = True