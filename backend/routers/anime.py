from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.anime as anime_crud
import schemas.anime as anime_schema
import models.anime as anime_model
from database.db import engine, get_db

router = APIRouter(prefix="/anime", tags=["anime"])

anime_model.Base.metadata.create_all(bind=engine)

# get anime info detail
@router.get("/{anime_id}", response_model=anime_schema.AnimeResponse)
async def anime_detail(anime_id: int, db: AsyncSession = Depends(get_db)):
    anime = await anime_crud.get_anime_detail(db=db, anime_id=anime_id)
    if anime is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return anime

# get anime info list(sort by kana)
@router.get("/search/", response_model=List[anime_schema.AnimeResponse])
async def anime_list(title: str = None, db: AsyncSession = Depends(get_db)):
    anime_list = await anime_crud.get_anime_list(db)
    if anime_list is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return anime_list

# create anime info request
@router.post("", response_model=anime_schema.AnimeResponse)
async def create_anime(anime_body: anime_schema.AnimeCreate, db: AsyncSession = Depends(get_db)):
    return await anime_crud.request_anime(db, anime_body)

# create edit anime info request
@router.post("/edit", response_model=anime_schema.AnimeEditResponse)
async def create_anime_edit(anime_body: anime_schema.AnimeEditCreate):
    return anime_schema.AnimeEditResponse(request_anime_id=1, **anime_body.model_dump())

# update anime.flag = 1 for display or anime.flag = 0 for not display
@router.put("/{anime_id}", response_model=anime_schema.AnimeResponse)
async def update_anime_flag(anime_id: int, flag: int, db: AsyncSession = Depends(get_db)):
    anime = await anime_crud.update_anime_flag(db, anime_id=anime_id, flag=flag)
    if anime is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return anime

# update anime.title or anime.introduction for edit function
@router.put("/edit/{anime_id}", response_model=anime_schema.AnimeResponse)
async def approve_anime_edit(anime_id: int, anime_body: anime_schema.AnimeBase):
    return anime_schema.AnimeResponse(anime_id=anime_id, **anime_body.model_dump(), kana="リコリス・リコイル", flag=1)

# update anime info excluding anime_id 
@router.put("/edit/admin/{anime_id}", response_model=anime_schema.AnimeResponse)
async def anime_edit_admin(anime_id: int, anime_body: anime_schema.AnimeCreate):
    return anime_schema.AnimeResponse(anime_id=anime_id, **anime_body.model_dump())

# delete anime info from DB
@router.delete("/{anime_id}")
async def delete_anime(anime_id: int, db: AsyncSession = Depends(get_db)):
    anime = await anime_crud.delete_anime(db=db, anime_id=anime_id)
    if anime is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return {"message": "Anime deleted successfully"}

# delete request anime from DB
@router.delete("/edit/{request_anime_id}")
async def delete_anime_request(request_anime_id: int):
    pass