from fastapi import APIRouter, Depends, HTTPException, status, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.anime as anime_crud
import schemas.anime as anime_schema
import models.anime as anime_model
import routers.user as user_router
import schemas.user as user_schema
from database.db import engine, get_db

router = APIRouter(prefix="/anime", tags=["anime"])

anime_model.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

# get anime info detail
@router.get("/detail/{anime_id}", response_model=anime_schema.AnimeResponse)
@limiter.limit("50/minute")
async def anime_detail(request: Request, anime_id: int, current_user: Optional[user_schema.CurrentUserResponse] = Depends(user_router.get_current_user_optional), db: AsyncSession = Depends(get_db)):
    anime = await anime_crud.get_anime_detail(db=db, anime_id=anime_id)
    if anime is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    
    if anime.flag != 1:
        if not current_user:
            raise HTTPException(status_code=401, detail="Authentication required")
        if current_user.user_attribute_name != "admin":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    return anime

# get edit request anime info detail
@router.get("/edit/{request_anime_id}", response_model=anime_schema.AnimeEditResponse)
@limiter.limit("30/minute")
async def request_edit_anime_detail(request: Request,  request_anime_id: int, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        result = await anime_crud.get_request_anime_detail(db=db, request_anime_id=request_anime_id)
        if result is None:
            raise HTTPException(status_code=404, detail="Request Edit Anime not found")
    return result

# get anime info list(sort by kana)
@router.get("/list/search", response_model=List[anime_schema.AnimeResponse])
@limiter.limit("100/minute")
async def anime_list(request: Request, title: str = None, db: AsyncSession = Depends(get_db)):
    anime_list = await anime_crud.get_anime_list(db=db)
    if anime_list is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return anime_list

# get anime info all flags
@router.get("/list/admin", response_model=List[anime_schema.AnimeResponse])
@limiter.limit("10/minute")
async def anime_list(request: Request, title: str = None, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        anime_list = await anime_crud.get_anime_list(db=db, flag=None)
        if anime_list is None:
            raise HTTPException(status_code=404, detail="Anime not found")
    return anime_list

# get edit request anime list
@router.get("/list/edit", response_model=List[anime_schema.AnimeEditResponse])
@limiter.limit("10/minute")
async def edit_anime_list(request: Request, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        anime_list = await anime_crud.get_request_anime_list(db=db)
        if anime_list is None:
            raise HTTPException(status_code=404, detail="Request Anime not found")
    return anime_list

# create anime info request
@router.post("", response_model=anime_schema.AnimeResponse)
@limiter.limit("2/minute")
async def create_anime(request: Request, anime_body: anime_schema.AnimeCreate = Depends(anime_schema.AnimeCreate.as_form), db: AsyncSession = Depends(get_db)):
    return await anime_crud.request_anime(db, anime_body)

# create edit anime info request
@router.post("/edit", response_model=anime_schema.AnimeEditResponse)
@limiter.limit("3/minute")
async def create_anime_edit(request: Request, edit_body: anime_schema.AnimeEditCreate = Depends(anime_schema.AnimeEditCreate.as_form), db: AsyncSession = Depends(get_db)):
    return await anime_crud.edit_request_anime(db, edit_body)

# update anime.flag = 1 for display or anime.flag = 0 for not display
@router.put("/{anime_id}", response_model=anime_schema.AnimeResponse)
@limiter.limit("10/minute")
async def update_anime_flag(request: Request, anime_id: int, flag: int, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        anime = await anime_crud.update_anime_flag(db, anime_id=anime_id, flag=flag)
        if anime is None:
            raise HTTPException(status_code=404, detail="Anime not found")
    return anime

# update anime.title or anime.introduction or amine.icon for edit function
@router.put("/edit/{request_anime_id}", response_model=anime_schema.AnimeResponse)
@limiter.limit("10/minute")
async def approve_anime_edit(request: Request, request_anime_id: int, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        anime = await anime_crud.approve_edit_request_anime(db, request_anime_id=request_anime_id)
        if anime is None:
            raise HTTPException(status_code=404, detail="Anime not found")
    return anime

# update anime info excluding anime_id 
@router.put("/edit/admin/{anime_id}", response_model=anime_schema.AnimeResponse)
@limiter.limit("10/minute")
async def anime_edit_admin(request: Request, anime_id: int, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), anime_body: anime_schema.AnimeCreate = Depends(anime_schema.AnimeCreate.as_form), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        anime = await anime_crud.update_anime(db, anime_id=anime_id, anime_body=anime_body)
        if anime is None:
            raise HTTPException(status_code=404, detail="Anime not found")
        return anime

# delete anime info from DB
@router.delete("/{anime_id}")
@limiter.limit("2/minute")
async def delete_anime(request: Request, anime_id: int, db: AsyncSession = Depends(get_db)):
    anime = await anime_crud.delete_anime(db=db, anime_id=anime_id)
    if anime is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return {"message": "Anime deleted successfully"}

# delete request anime from DB
@router.delete("/edit/{request_anime_id}")
@limiter.limit("10/minute")
async def delete_anime_request(request: Request, request_anime_id: int, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        result = await anime_crud.delete_edit_request_anime(db=db, request_anime_id=request_anime_id)
        if result is None:
            raise HTTPException(status_code=404, detail="Request Edit Anime not found")
    return {"message": "Request Edit Anime deleted successfully"}