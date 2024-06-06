from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.place as place_crud
import schemas.place as place_schema
import models.place as place_model
from database.db import engine, get_db

router = APIRouter(prefix="/places", tags=["places"])

place_model.Base.metadata.create_all(bind=engine)

# get place info detail
@router.get("/detail/{place_id}", response_model=place_schema.PlaceResponse)
async def place_detail(place_id: str, db: AsyncSession = Depends(get_db)):
    place = await place_crud.get_place_detail(db, place_id=place_id) 
    if place is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return place
 
# get place list by name or anime title or region
@router.get("/list/search", response_model=List[place_schema.PlaceResponse])
async def place_list(name: str = None, anime_id: int = None, region_id: int = None, db: AsyncSession = Depends(get_db)):
    places = await place_crud.get_place_list(db=db, name=name, anime_id=anime_id, region_id=region_id)
    if places is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return places

# create place info
@router.post("", response_model=place_schema.PlaceResponse)
async def create_place(place_body: place_schema.PlaceCreate, db: AsyncSession = Depends(get_db)):
    return await place_crud.create_place(db=db, place_body=place_body)

# create edit or delete place info request
@router.post("/request", response_model=place_schema.PlaceRequestResponse)
async def create_place_request(place_body: place_schema.PlaceRequestCreate):
    return place_schema.PlaceRequestResponse(request_place_id=111, **place_body.model_dump())

# update place.flag = 1 for display, place.flag = 0 for not display
@router.put("/{place_id}", response_model=place_schema.PlaceResponse)
async def update_place_flag(place_id: str, flag: int, db: AsyncSession = Depends(get_db)):
    place = await place_crud.update_place_flag(db, place_id=place_id, flag=flag)
    if place is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    return place

# update place info to approve edit request
@router.put("/edit/{place_id}", response_model=place_schema.PlaceResponse)
async def approve_place_edit(place_id: str, place_body: place_schema.PlaceCreate):
    return place_schema.PlaceResponse(place_id=place_id, **place_body.model_dump())

# update place info to approve edit request
@router.put("/edit/admin/{place_id}", response_model=place_schema.PlaceResponse)
async def palce_edit_admin(place_id: str, place_body: place_schema.PlaceCreate):
    return place_schema.PlaceResponse(place_id=place_id, **place_body.model_dump())

# delete anime info from DB
@router.delete("/{place_id}")
async def delete_place(place_id: str, db: AsyncSession = Depends(get_db)):
    place = await place_crud.delete_place(db=db, place_id=place_id)
    if place is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}

# delete anime info from DB
@router.delete("/edit/{request_place_id}")
async def delete_place_request():
    pass