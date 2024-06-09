from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.comment as comment_schema
import cruds.comment as comment_crud
import models.comment as comment_model
from database.db import engine, get_db

router = APIRouter(prefix="/comments", tags=["comments"])

comment_model.Base.metadata.create_all(bind=engine)

# get comment detail
@router.get("/detail/{comment_id}", response_model=comment_schema.CommentResponse)
async def comment_detail(comment_id: str, db: AsyncSession = Depends(get_db)):
    comment = await comment_crud.get_comment_detail(db=db, comment_id=comment_id) 
    if comment is None:
        raise HTTPException(status_code=404, detail="comment not found")
    return comment

# get comment List
@router.get("/list/", response_model=List[comment_schema.CommentResponse])
async def comment_list(place_id: str = None, anime_id: int = None, db: AsyncSession = Depends(get_db)):
    comments = await comment_crud.get_comment_list(db=db, anime_id=anime_id, place_id=place_id)
    if comments is None:
        raise HTTPException(status_code=404, detail="comment not found")
    return comments

# get report comment detail
@router.get("/report/detail/{delete_comment_id}", response_model=comment_schema.DeleteCommentResponse)
async def comment_detail(delete_comment_id: int, db: AsyncSession = Depends(get_db)):
    comment = await comment_crud.get_report_comment_detail(db=db, delete_comment_id=delete_comment_id) 
    if comment is None:
        raise HTTPException(status_code=404, detail="report comment not found")
    return comment

# post comment
@router.post("/", response_model=comment_schema.CommentResponse)
async def create_comment(comment_body: comment_schema.CommentCreate, db: AsyncSession = Depends(get_db)):
    return await comment_crud.create_comment(db=db, comment_body=comment_body)

# create report comment
@router.post("/report", response_model=comment_schema.DeleteCommentResponse)
async def create_comment_report(comment_body: comment_schema.DeleteCommentCreate, db: AsyncSession = Depends(get_db)):
    return await comment_crud.create_report_comment(db=db, comment_body=comment_body)

# delete comment from DB
@router.delete("/{comment_id}")
async def delete_comment(comment_id: str, db: AsyncSession = Depends(get_db)):
    comment = await comment_crud.delete_comment(db=db, comment_id=comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="comment not found")
    return {"message": "comment deleted successfully"}

# delete delete comment from DB
@router.delete("/report/{delete_comment_id}")
async def delete_comment_report(delete_comment_id: int, db: AsyncSession = Depends(get_db)):
    comment = await comment_crud.delete_comment(db=db, delete_comment_id=delete_comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="comment not found")
    return {"message": "comment deleted successfully"}