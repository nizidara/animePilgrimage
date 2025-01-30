from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Request, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.comment as comment_schema
import cruds.comment as comment_crud
import models.comment as comment_model
import routers.user as user_router
import schemas.user as user_schema
from database.db import engine, get_db

router = APIRouter(prefix="/comments", tags=["comments"])

comment_model.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

# get comment detail
@router.get("/detail/{comment_id}", response_model=comment_schema.CommentResponse)
@limiter.limit("60/minute")  
async def comment_detail(request: Request, comment_id: str, db: AsyncSession = Depends(get_db)):
    comment = await comment_crud.get_comment_detail(db=db, comment_id=comment_id) 
    if comment is None:
        raise HTTPException(status_code=404, detail="comment not found")
    return comment

# get comment List
@router.get("/list", response_model=comment_schema.PaginatedCommentResponse)
@limiter.limit("60/minute")  
async def comment_list(request: Request, place_id: str = None, anime_id: int = None, page: int = 1, page_size: int = 50,  db: AsyncSession = Depends(get_db)):
    comments = await comment_crud.get_comment_list(db=db, anime_id=anime_id, place_id=place_id, page=page, page_size=page_size)
    if comments is None:
        raise HTTPException(status_code=404, detail="comment not found")
    return comments

# get report comment detail
@router.get("/report/detail/{delete_comment_id}", response_model=comment_schema.DeleteCommentResponse)
@limiter.limit("60/minute")  
async def report_comment_detail(request: Request, delete_comment_id: int, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        comment = await comment_crud.get_report_comment_detail(db=db, delete_comment_id=delete_comment_id) 
        if comment is None:
            raise HTTPException(status_code=404, detail="report comment not found")
    return comment

# get report comment list
@router.get("/report/list", response_model=List[comment_schema.DeleteCommentResponse])
@limiter.limit("60/minute")  
async def report_comment_detail(request: Request, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        comments = await comment_crud.get_report_comment_list(db=db) 
        if comments is None:
            raise HTTPException(status_code=404, detail="report comments not found")
    return comments

def get_upload_files(files: Optional[List[UploadFile]] = File(None)):
    if files is None:
        return []
    return files

# post comment
@router.post("", response_model=comment_schema.CommentResponse)
@limiter.limit("5/minute")  
async def create_comment(request: Request, comment_body: comment_schema.CommentCreate = Depends(comment_schema.CommentCreate.as_form), db: AsyncSession = Depends(get_db)):
    return await comment_crud.create_comment(db=db, comment_body=comment_body)

# create report comment
@router.post("/report", response_model=comment_schema.DeleteCommentResponse)
@limiter.limit("3/minute")  
async def create_comment_report(request: Request, comment_body: comment_schema.DeleteCommentCreate, db: AsyncSession = Depends(get_db)):
    return await comment_crud.create_report_comment(db=db, comment_body=comment_body)


# approve delete request
@router.put("/report/{delete_comment_id}", response_model=comment_schema.CommentResponse)
@limiter.limit("10/minute")  
async def approve_report_comment(request: Request, delete_comment_id: int, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        comment = await comment_crud.approve_delete_comment(delete_comment_id=delete_comment_id ,db=db)
        if comment is None:
            raise HTTPException(status_code=404, detail="Comment not found")
    return comment

# delete comment from DB
@router.delete("/{comment_id}")
@limiter.limit("10/minute")  
async def delete_comment(request: Request, comment_id: str, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        comment = await comment_crud.delete_comment(db=db, comment_id=comment_id)
        if comment is None:
            raise HTTPException(status_code=404, detail="comment not found")
    return {"message": "comment deleted successfully"}

# delete delete comment from DB
@router.delete("/report/{delete_comment_id}")
@limiter.limit("10/minute")  
async def delete_comment_report(request: Request, delete_comment_id: int, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        comment = await comment_crud.delete_delete_comment(db=db, delete_comment_id=delete_comment_id)
        if comment is None:
            raise HTTPException(status_code=404, detail="comment not found")
    return {"message": "comment deleted successfully"}