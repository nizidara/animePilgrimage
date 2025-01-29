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
    #icon: UploadFile                   #check for SwaggerUI
    icon: Optional[UploadFile]

    @classmethod
    def as_form(
        cls,
        title: str = Form(...),
        introduction: Optional[str] = Form(""),
        kana: str = Form(...),
        flag: int = Form(...),
        #icon: UploadFile = File(),     #check for SwaggerUI
        icon: Optional[UploadFile] = File(None),
    ):
        return cls(
            title=title,
            introduction=introduction,
            kana=kana,
            flag=flag,
            icon=icon
        )

    class Config:
        from_attributes = True

class AnimeResponse(AnimeBase):
    kana: str
    flag: int
    anime_id: int
    file_name: Optional[str] = ""

    class Config:
        from_attributes = True

class AnimeEditCreate(AnimeBase):
    anime_id: int
    request_type: int
    contents: str
    user_id: Optional[str] = None
    #icon: UploadFile                   #check for SwaggerUI
    icon: Optional[UploadFile]

    @classmethod
    def as_form(
        cls,
        title: str = Form(...),
        introduction: Optional[str] = Form(""),
        anime_id: int = Form(...),
        request_type: int = Form(...),
        contents: str = Form(...),
        user_id: Optional[str] = Form(None),
        #icon: UploadFile = File(),     #check for SwaggerUI
        icon: Optional[UploadFile] = File(None),
    ):
        return cls(
            title=title,
            introduction=introduction,
            anime_id=anime_id,
            request_type=request_type,
            contents=contents,
            user_id=user_id,
            icon=icon
        )

    class Config:
        from_attributes = True

class AnimeEditResponse(AnimeBase):
    anime_id: int
    request_date: datetime
    request_type: int
    contents: str
    user_id: Optional[str] = None
    request_anime_id: int
    user_name: Optional[str] = "no name"
    file_name: Optional[str] = ""

    class Config:
        from_attributes = True