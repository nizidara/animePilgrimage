from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel
from fastapi import UploadFile, File, Form

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
    images: List[UploadFile]
    icon_index: Optional[int] = None

    @classmethod
    def as_form(
        cls,
        anime_id: int = Form(...),
        name: str = Form(...),
        latitude: float = Form(...),
        longitude: float = Form(...),
        comment: Optional[str] = Form(None),
        flag: int = Form(...),
        region_id: int = Form(...),
        created_user_id: Optional[str] = Form(None),
        edited_user_id: Optional[str] = Form(None),
        images: List[UploadFile] = File([]),
        icon_index: Optional[int] = Form(None),
    ):
        return cls(
            anime_id=anime_id,
            name=name,
            latitude=latitude,
            longitude=longitude,
            comment=comment,
            flag=flag,
            region_id=region_id,
            created_user_id=created_user_id,
            edited_user_id=edited_user_id,
            images=images,
            icon_index=icon_index
        )

    class Config:
        orm_mode = True

class PlaceResponse(PlaceBase):
    flag: int
    region_id: int
    created_user_id: Optional[str] = None
    edited_user_id: Optional[str] = None
    place_id: str
    region_name: str
    anime_title: str
    created_user_name: Optional[str] = "no name"
    edited_user_name: Optional[str] = "no name"
    place_icon: Optional[str] = ""
    anime_icon: Optional[str] = ""
    file_names: List[str] = []

    class Config:
        orm_mode = True

class PaginatedPlaceResponse(BaseModel):
    total_count: int
    page: int
    page_size: int
    places: List[PlaceResponse]

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
    anime_icon: Optional[str] = ""
    user_name: Optional[str] = "no name"

    class Config:
        orm_mode = True

class PlaceAdminEdit(PlaceBase):
    flag: int
    region_id: int
    created_user_id: Optional[str] = None
    edited_user_id: Optional[str] = None

    class Config:
        orm_mode = True