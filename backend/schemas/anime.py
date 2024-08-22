from pydantic import BaseModel
from datetime import datetime

from typing import Optional, List
from fastapi import UploadFile, File, Form

class AnimeBase(BaseModel):
    title: str
    introduction: Optional[str] = ""

class AnimeCreate(AnimeBase):
    kana: str
    flag: int
    icon: UploadFile
    #icon: Optional[UploadFile]

    @classmethod
    def as_form(
        cls,
        title: str = Form(...),
        introduction: Optional[str] = Form(""),
        kana: str = Form(...),
        flag: int = Form(...),
        icon: UploadFile = File(),
        #icon: Optional[UploadFile] = File(None),
    ):
        return cls(
            title=title,
            introduction=introduction,
            kana=kana,
            flag=flag,
            icon=icon
        )

    class Config:
        orm_mode = True

class AnimeResponse(AnimeBase):
    kana: str
    flag: int
    anime_id: int
    file_name: Optional[str] =""

    class Config:
        orm_mode = True

class AnimeEditCreate(AnimeBase):
    anime_id: int
    request_date: datetime
    request_type: int
    contents: str
    user_id: Optional[str] = None

    class Config:
        orm_mode = True

class AnimeEditResponse(AnimeEditCreate):
    request_anime_id: int
    user_name: Optional[str] = "no name"

    class Config:
        orm_mode = True