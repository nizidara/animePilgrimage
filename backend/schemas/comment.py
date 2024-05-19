from typing import Optional
from datetime import datetime

from pydantic import BaseModel

class CommentBase(BaseModel):
    comment: str
    comment_date: datetime
    user_id: Optional[str]

class CommentCreate(CommentBase):
    range_id: int
    place_id: str

    class Config:
        orm_mode = True

class CommentResponse(CommentCreate):
    comment_id: str

class DeleteCommentCreate(BaseModel):
    comment_id: str
    request_date: datetime
    contents: str
    user_id: Optional[str]

class DeleteCommentResponse(DeleteCommentCreate):
    delete_comment_id: int

    class Config:
        orm_mode = True