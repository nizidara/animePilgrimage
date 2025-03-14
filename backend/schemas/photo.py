from pydantic import BaseModel

from typing import Optional, List
from fastapi import UploadFile, File, Form

class AnimeIconCreate(BaseModel):
    file_name: Optional[str] = ""

    class Config:
        from_attributes = True

class AnimeIconResponse(AnimeIconCreate):
    anime_id: int
    title: str

    class Config:
        from_attributes = True

class PlacePhotoIconCreate(BaseModel):
    anime_photo_id: str
    place_id: Optional[str] = None

    class Config:
        from_attributes = True

class PlacePhotoIconResponse(PlacePhotoIconCreate):
    place_id: str
    file_name: str
    place_name: str

    class Config:
        from_attributes = True

class AnimePhotoCreate(BaseModel):
    images: List[UploadFile]
    place_id: str
    user_id: Optional[str] = None

    @classmethod
    def as_form(
        cls,
        images: List[UploadFile] = File([]),
        place_id: str = Form(...),
        user_id: Optional[str] = Form(None),
    ):
        return cls(
            images=images,
            place_id=place_id,
            user_id=user_id
        )
    
    class Config:
        from_attributes = True

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
        from_attributes = True

class RealPhotoCreate(BaseModel):
    images: List[UploadFile]
    place_id: str
    comment_id: Optional[str] = None
    user_id: Optional[str] = None

    @classmethod
    def as_form(
        cls,
        images: List[UploadFile] = File([]),
        place_id: str = Form(...),
        comment_id: Optional[str] = Form(None),
        user_id: Optional[str] = Form(None),
    ):
        return cls(
            images=images,
            place_id=place_id,
            comment_id=comment_id,
            user_id=user_id
        )
    
    class Config:
        from_attributes = True

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
        from_attributes = True

class PaginatedAnimePhotoResponse(BaseModel):
    total_count: int
    page: int
    page_size: int
    photos: List[AnimePhotoResponse]

class PaginatedRealPhotoResponse(BaseModel):
    total_count: int
    page: int
    page_size: int
    photos: List[RealPhotoResponse]