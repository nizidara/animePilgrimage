from fastapi import APIRouter
from typing import List, Union

import schemas.place as place_schema

router = APIRouter(tags=["Places"])

# get place info detail
@router.get("/place/", response_model=place_schema.PlaceResponse)
async def detail_place(place_id: str):
    return place_schema.PlaceResponse(place_id=place_id, anime_id=123, name="すみだ水族館", latitude=1.23, longitude=2.34, comment="さかなー", flag=1, region_id=123, created_user_id=None, edited_user_id=None)

# get place list by name or anime title or region
@router.get("/place/search/", response_model=List[place_schema.PlaceResponse])
async def list_place_by_name(name: str = None, anime_id: int = None, region_id: int = None):
    if name is None:
        name = "すみだ水族館"
    if anime_id is None:
        anime_id = 1
    if region_id is None:
        region_id = 1
    return [place_schema.PlaceResponse(place_id="123", anime_id=anime_id, name=name, latitude=1.23, longitude=2.34, comment="さかなー", flag=1, region_id=region_id, created_user_id=None, edited_user_id=None)]

# create place info
@router.post("/place", response_model=place_schema.PlaceResponse)
async def create_place(place_body: place_schema.PlaceCreate):
    return place_schema.PlaceResponse(place_id="123", **place_body.model_dump())

# create edit or delete place info request
@router.post("/request/place", response_model=place_schema.PlaceRequestResponse)
async def create_request_place(place_body: place_schema.PlaceRequestCreate):
    return place_schema.PlaceRequestResponse(request_place_id=111, **place_body.model_dump())

# update place.flag = 1 for display, place.flag = 0 for not display
@router.put("/place/flag/{place_id}", response_model=place_schema.PlaceResponse)
async def update_place_flag(place_id: str, flag: int):
    return place_schema.PlaceResponse(place_id=place_id, anime_id=123, name="すみだ水族館", latitude=1.23, longitude=2.34, comment="さかなー", flag=flag, region_id=123, created_user_id=None, edited_user_id=None)

# update place info to approve edit request
@router.put("/edit/place/{place_id}", response_model=place_schema.PlaceResponse)
async def approve_edit_place(place_id: str, place_body: place_schema.PlaceCreate):
    return place_schema.PlaceResponse(place_id=place_id, **place_body.model_dump())

# update place info to approve edit request
@router.put("/admin/edit/place/{place_id}", response_model=place_schema.PlaceResponse)
async def admin_edit_place(place_id: str, place_body: place_schema.PlaceCreate):
    return place_schema.PlaceResponse(place_id=place_id, **place_body.model_dump())

# delete anime info from DB
@router.delete("/place/{place_id}")
async def delete_place():
    pass

# delete anime info from DB
@router.delete("/edit/place/{request_place_id}")
async def delete_request_place():
    pass