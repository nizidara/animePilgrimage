from fastapi import APIRouter, Depends, HTTPException, status, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.photo as photo_crud
import schemas.photo as photo_schema
import models.photo as photo_model
import routers.user as user_router
import schemas.user as user_schema
from database.db import engine, get_db

router = APIRouter(prefix="/photos", tags=["photos"])

photo_model.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

# get anime icon
@router.get("/anime/icons/{anime_id}", response_model=photo_schema.AnimeIconResponse)
@limiter.limit("50/minute")
async def get_anime_icon(request: Request, anime_id: int, db: AsyncSession = Depends(get_db)):
    icon = await photo_crud.get_anime_icon(db=db, anime_id=anime_id)
    if icon is None:
        raise HTTPException(status_code=404, detail="Icon not found")
    return icon
    
# get place icon
@router.get("/places/icons/{place_id}", response_model=photo_schema.PlacePhotoIconResponse)
@limiter.limit("50/minute")
async def get_place_icon(request: Request, place_id: str, db: AsyncSession = Depends(get_db)):
    icon = await photo_crud.get_place_icon(db=db, place_id=place_id)
    if icon is None:
        raise HTTPException(status_code=404, detail="Icon not found")
    return icon

# get animephoto list
@router.get("/anime/list/{place_id}", response_model=photo_schema.PaginatedAnimePhotoResponse)
@limiter.limit("30/minute")
async def get_anime_photo_list(request: Request, place_id: str, page: int = 1, page_size: int = 12, db: AsyncSession = Depends(get_db)):
    photos = await photo_crud.get_anime_photo_list(db=db, place_id=place_id, page=page, page_size=page_size)
    if photos is None:
        raise HTTPException(status_code=404, detail="anime photo not found")
    return photos

# get realphoto list
@router.get("/reals/list/{place_id}", response_model=photo_schema.PaginatedRealPhotoResponse)
@limiter.limit("30/minute")
async def get_real_photo_list(request: Request, place_id: str, comment_id: str = None, page: int = 1, page_size: int = 12, db: AsyncSession = Depends(get_db)):
    photos = await photo_crud.get_real_photo_list(db=db, place_id=place_id, comment_id=comment_id, page=page, page_size=page_size)
    if photos is None:
        raise HTTPException(status_code=404, detail="real photo not found")
    return photos

# post anime photo
@router.post("/anime", response_model=List[photo_schema.AnimePhotoResponse])
@limiter.limit("5/minute")
async def create_anime_photos(request: Request, photo_body: photo_schema.AnimePhotoCreate = Depends(photo_schema.AnimePhotoCreate.as_form), db: AsyncSession = Depends(get_db)):
    return await photo_crud.create_anime_photo(db=db, photo_body=photo_body)

# post real photo
@router.post("/reals", response_model=List[photo_schema.RealPhotoResponse])
@limiter.limit("5/minute")
async def create_real_photos(request: Request, photo_body: photo_schema.RealPhotoCreate = Depends(photo_schema.RealPhotoCreate.as_form), db: AsyncSession = Depends(get_db)):
    return await photo_crud.create_real_photo(db=db, photo_body=photo_body)

# update anime icon
#@router.put("/anime/icons/{anime_id}", response_model=photo_schema.AnimeIconResponse)
#@limiter.limit("5/minute")
#async def update_anime_icon(request: Request, anime_id: int, file_name: str, db: AsyncSession = Depends(get_db)):
#    icon = await photo_crud.update_anime_icon(db=db, anime_id=anime_id, file_name=file_name)
#    if icon is None:
#        raise HTTPException(status_code=404, detail="Anime Icon not found")
#    return icon

# update or post place icon
@router.put("/places/icons", response_model=photo_schema.PlacePhotoIconResponse)
@limiter.limit("5/minute")
async def update_place_icon(request: Request, place_icon_body: photo_schema.PlacePhotoIconCreate, db: AsyncSession = Depends(get_db)):
    icon = await photo_crud.update_place_icon(db=db, place_icon_body=place_icon_body)
    if icon is None:
        raise HTTPException(status_code=404, detail="Place Icon not found")
    return icon

# delete anime photo file DB
@router.delete("/anime/{anime_photo_id}")
@limiter.limit("10/minute")
async def delete_anime_photo(request: Request, anime_photo_id: str, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        photo = await photo_crud.delete_anime_photo(db=db, anime_photo_id=anime_photo_id)
        if photo is None:
            raise HTTPException(status_code=404, detail="anime photo not found")
        return {"message": "anime photo deleted successfully"}

# delete real photo file DB
@router.delete("/reals/{real_photo_id}")
@limiter.limit("10/minute")
async def delete_real_photo(request: Request, real_photo_id: str, current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user_required), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    else:
        photo = await photo_crud.delete_real_photo(db=db, real_photo_id=real_photo_id)
        if photo is None:
            raise HTTPException(status_code=404, detail="real photo not found")
        return {"message": "real photo deleted successfully"}