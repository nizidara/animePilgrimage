from typing import Optional
from datetime import datetime

from pydantic import BaseModel

class CommentBase(BaseModel):
    comment: str
    comment_date: datetime
    user_id: Optional[str] = None

class CommentCreate(CommentBase):
    range_id: int
    place_id: str

    class Config:
        orm_mode = True

class CommentResponse(CommentCreate):
    comment_id: str
    anime_id: int
    anime_title: str
    place_name: str
    range_name: str
    user_name: Optional[str] = "no name"
    file_name: Optional[str] = ""

    class Config:
        orm_mode = True

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
        orm_mode = True