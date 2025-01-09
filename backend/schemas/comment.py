from typing import Optional, List
from datetime import datetime

from pydantic import BaseModel
from fastapi import UploadFile, File, Form

class CommentBase(BaseModel):
    comment: str
    comment_date: datetime
    user_id: Optional[str] = None

class CommentCreate(CommentBase):
    range_id: int
    place_id: str
    images: List[UploadFile]

    @classmethod
    def as_form(
        cls,
        comment: str = Form(...),
        comment_date: datetime = Form(...),
        user_id: Optional[str] = Form(None),
        range_id: int = Form(...),
        place_id: str = Form(...),
        images: List[UploadFile] = File([]),
    ):
        return cls(
            comment=comment,
            comment_date=comment_date,
            user_id=user_id,
            range_id=range_id,
            place_id=place_id,
            images=images
        )
    
    class Config:
        from_attributes = True

class CommentResponse(CommentBase):
    range_id: int
    place_id: str
    comment_id: str
    anime_id: int
    anime_title: str
    place_name: str
    range_name: str
    user_name: Optional[str] = "no name"
    file_names: List[str] = []

    class Config:
        from_attributes = True

class PaginatedCommentResponse(BaseModel):
    total_count: int
    page: int
    page_size: int
    comments: List[CommentResponse]

class DeleteCommentCreate(BaseModel):
    comment_id: str
    request_date: datetime
    contents: str
    user_id: Optional[str] = None

class DeleteCommentResponse(DeleteCommentCreate):
    delete_comment_id: int
    comment: str
    user_name: Optional[str] ="no name"

    class Config:
        from_attributes = True