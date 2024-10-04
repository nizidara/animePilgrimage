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
        raise HTTPException(status_code=404, detail="Icon not found")
    return icon
    
# get place icon
@router.get("/places/icons/{place_id}", response_model=photo_schema.PlacePhotoIconResponse)
async def get_place_icon(place_id: str, db: AsyncSession = Depends(get_db)):
    icon = await photo_crud.get_place_icon(db=db, place_id=place_id)
    if icon is None:
        raise HTTPException(status_code=404, detail="Icon not found")
    return icon

# get animephoto list
@router.get("/anime/list/{place_id}", response_model=List[photo_schema.AnimePhotoResponse])
async def get_anime_photo_list(place_id: str, db: AsyncSession = Depends(get_db)):
    photos = await photo_crud.get_anime_photo_list(db=db, place_id=place_id)
    if photos is None:
        raise HTTPException(status_code=404, detail="anime photo not found")
    return photos

# get realphoto list
@router.get("/reals/list/{place_id}", response_model=List[photo_schema.RealPhotoResponse])
async def get_real_photo_list(place_id: str, comment_id: str = None, db: AsyncSession = Depends(get_db)):
    photos = await photo_crud.get_real_photo_list(db=db, place_id=place_id, comment_id=comment_id)
    if photos is None:
        raise HTTPException(status_code=404, detail="anime photo not found")
    return photos

# post anime photo
@router.post("/anime", response_model=List[photo_schema.AnimePhotoResponse])
async def create_anime_photos(photo_body: photo_schema.AnimePhotoCreate = Depends(photo_schema.AnimePhotoCreate.as_form), db: AsyncSession = Depends(get_db)):
    return await photo_crud.create_anime_photo(db=db, photo_body=photo_body)

# post real photo
@router.post("/reals", response_model=List[photo_schema.RealPhotoResponse])
async def create_real_photos(photo_body: photo_schema.RealPhotoCreate = Depends(photo_schema.RealPhotoCreate.as_form), db: AsyncSession = Depends(get_db)):
    return await photo_crud.create_real_photo(db=db, photo_body=photo_body)

# update anime icon
@router.put("/anime/icons/{anime_id}", response_model=photo_schema.AnimeIconResponse)
async def update_anime_icon(anime_id: int, file_name: str, db: AsyncSession = Depends(get_db)):
    icon = await photo_crud.update_anime_icon(db=db, anime_id=anime_id, file_name=file_name)
    if icon is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return icon

# update or post place icon
@router.put("/places/icons", response_model=photo_schema.PlacePhotoIconResponse)
async def update_place_icon(place_icon_body: photo_schema.PlacePhotoIconCreate, db: AsyncSession = Depends(get_db)):
    icon = await photo_crud.update_place_icon(db=db, place_icon_body=place_icon_body)
    if icon is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return icon

# delete anime photo file DB
@router.delete("/anime/{anime_photo_id}")
async def delete_anime_photo(anime_photo_id: str, db: AsyncSession = Depends(get_db)):
    photo = await photo_crud.delete_anime_photo(db=db, anime_photo_id=anime_photo_id)
    if photo is None:
        raise HTTPException(status_code=404, detail="anime photo not found")
    return {"message": "anime photo deleted successfully"}

# delete place photo file DB
@router.delete("/reals/{real_photo_id}")
async def delete_anime_photo(real_photo_id: str, db: AsyncSession = Depends(get_db)):
    photo = await photo_crud.delete_real_photo(db=db, real_photo_id=real_photo_id)
    if photo is None:
        raise HTTPException(status_code=404, detail="real photo not found")
    return {"message": "real photo deleted successfully"}