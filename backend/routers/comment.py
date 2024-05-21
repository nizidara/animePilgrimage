from fastapi import APIRouter
from typing import List

import schemas.comment as comment_schema

router = APIRouter(prefix="/comments", tags=["comments"])

# get comment detail
@router.get("/{comment_id}", response_model=comment_schema.CommentResponse)
async def comment_detail(comment_id: str):
    return comment_schema.CommentResponse(comment_id=comment_id, comment="さかなーちんあなご～", comment_date="2023-07-12 11:22:33", range_id=123, place_id="place_id", user_id=None)

# get comment List
@router.get("/list/", response_model=List[comment_schema.CommentResponse])
async def comment_list(place_id: str = None):
    if place_id is None:
        place_id = "1"
    return [comment_schema.CommentResponse(comment_id="123", comment="さかなーちんあなご～", comment_date="2023-07-12 11:22:33", range_id=123, place_id=place_id, user_id=None)]

# post comment
@router.post("/", response_model=comment_schema.CommentResponse)
async def create_comment(comment_body: comment_schema.CommentCreate):
    return comment_schema.CommentResponse(comment_id="123", **comment_body.model_dump())

# create report comment
@router.post("/report", response_model=comment_schema.DeleteCommentResponse)
async def create_comment_report(delete_comment_body: comment_schema.DeleteCommentCreate):
    return comment_schema.DeleteCommentResponse(delete_comment_id=123, **delete_comment_body.model_dump())

# delete comment from DB
@router.delete("/{comment_id}")
async def delete_comment():
    pass

# delete delete comment from DB
@router.delete("/report/{delete_comment_id}")
async def delete_comment_report():
    pass