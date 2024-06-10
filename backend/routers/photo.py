from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.photo as photo_crud
import schemas.photo as photo_schema
import models.photo as photo_model
from database.db import engine, get_db

router = APIRouter(prefix="/photos", tags=["photos"])

photo_model.Base.metadata.create_all(bind=engine)

# get anime icon
@router.get("/anime/icons/{anime_id}", response_model=photo_schema.AnimeIconResponse)
async def get_anime_icon(anime_id: int, db: AsyncSession = Depends(get_db)):
    icon = await photo_crud.get_anime_icon(db=db, anime_id=anime_id)
    if icon is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return icon
    
# get place icon
@router.get("/places/icons/{place_id}", response_model=photo_schema.PlacePhotoIconResponse)
async def get_place_icon(place_id: str):
    return photo_schema.PlacePhotoIconResponse(place_id=place_id, file_name="img123")

# get animephoto list
@router.get("/anime/list/{place_id}", response_model=List[photo_schema.AnimePhotoResponse])
async def get_anime_photo_list(place_id: str):
    return [photo_schema.AnimePhotoResponse(anime_photo_id="1234", place_id=place_id, file_name="img123", user_id=None)]

# get realphoto list
@router.get("/reals/list/{place_id}", response_model=List[photo_schema.RealPhotoResponse])
async def get_real_photo_list(place_id: str, comment_id: str = None):
    return [photo_schema.RealPhotoResponse(real_photo_id="1234", place_id=place_id, file_name="img123", user_id=None, comment_id=comment_id)]

# post place icon
@router.post("/places/icons", response_model=photo_schema.PlacePhotoIconResponse)
async def create_place_icon(place_icon_body: photo_schema.PlacePhotoIconCreate):
    return photo_schema.PlacePhotoIconResponse(**place_icon_body.model_dump())

# post anime photo
@router.post("/anime", response_model=photo_schema.AnimePhotoResponse)
async def create_anime_photos(anime_photo_body: photo_schema.AnimePhotoCreate):
    return photo_schema.AnimePhotoResponse(anime_photo_id="123", **anime_photo_body.model_dump())

# post real photo
@router.post("/reals", response_model=photo_schema.RealPhotoResponse)
async def create_real_photos(real_photo_body: photo_schema.RealPhotoCreate):
    return photo_schema.RealPhotoResponse(real_photo_id="123", **real_photo_body.model_dump())

# update anime icon
@router.put("/anime/icons/{anime_id}", response_model=photo_schema.AnimeIconResponse)
async def update_anime_icon(anime_id: int, file_name: str, db: AsyncSession = Depends(get_db)):
    icon = await photo_crud.update_anime_icon(db=db, anime_id=anime_id, file_name=file_name)
    if icon is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return icon

# update place icon
@router.put("/places/icons/{place_id}", response_model=photo_schema.PlacePhotoIconResponse)
async def update_place_icon(place_id: str, anime_photo_id: str):
    return photo_schema.PlacePhotoIconResponse(place_id=place_id, file_name="img2024")

# delete anime photo file DB
@router.delete("/anime/{anime_photo_id}")
async def delete_anime_photo():
    pass

# delete place photo file DB
@router.delete("/reals/{real_photo_id}")
async def delete_anime_photo():
    pass