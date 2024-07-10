from pydantic import BaseModel
from datetime import datetime

from typing import Optional

class AnimeBase(BaseModel):
    title: str
    introduction: Optional[str]

class AnimeCreate(AnimeBase):
    kana: str
    flag: int

    class Config:
        orm_mode = True

class AnimeResponse(AnimeCreate):
    anime_id: int

    class Config:
        orm_mode = True

class AnimeEditCreate(AnimeBase):
    anime_id: int
    request_date: datetime
    request_type: int
    contents: str
    user_id: Optional[str]

    class Config:
        orm_mode = True

class AnimeEditResponse(AnimeEditCreate):
    request_anime_id: int
    user_name: Optional[str] = "no name"

    class Config:
        orm_mode = True