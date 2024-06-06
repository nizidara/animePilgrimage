from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.place as place_model
import schemas.place as place_schema

# create place
async def create_place(
        db: AsyncSession, place_body: place_schema.PlaceCreate
) -> place_schema.PlaceResponse:
    
    # convert str -> UUID
    if place_body:
        place_dict = place_body.model_dump()
        if place_body.created_user_id is not None:
            place_dict['created_user_id'] = uuid.UUID(place_body.created_user_id).bytes
        if place_body.edited_user_id is not None:
            place_dict['edited_user_id'] = uuid.UUID(place_body.edited_user_id).bytes
    place = place_model.Place(**place_dict)

    # create
    db.add(place)
    db.commit()
    db.refresh(place)

    # convert UUID -> str
    response = None
    if place:
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
        response = place_schema.PlaceResponse(**response_dict)

    return response

# read list
async def get_place_list(db:AsyncSession, name: str, anime_id: int, region_id: int) -> List[Tuple[place_schema.PlaceResponse]]:
    # get
    places = db.query(place_model.Place).all()
    
    # convert UUID -> str
    response_list = []
    if places:
        for place in places:
            response_dict = place.__dict__
            response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
            if place.created_user_id is not None:
                response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
            if place.edited_user_id is not None:
                response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
            response_list.append(place_schema.PlaceResponse(**response_dict))

    return response_list

# read detail
async def get_place_detail(db: AsyncSession, place_id: str) -> place_schema.PlaceResponse:
    # convert str -> UUID
    place_id_bytes = uuid.UUID(place_id).bytes

    # get
    place = db.query(place_model.Place).filter(place_model.Place.place_id == place_id_bytes).first()

    # convert UUID -> str
    response = None
    if place:
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
        response = place_schema.PlaceResponse(**response_dict)

    return response

# update flag
async def update_place_flag(db: AsyncSession, place_id: str, flag: int) -> place_schema.PlaceResponse:
    # convert str -> UUID
    place_id_bytes = uuid.UUID(place_id).bytes
    
    # update flag
    place = db.query(place_model.Place).filter(place_model.Place.place_id == place_id_bytes).first()
    response = None
    if place:
        place.flag = flag
        db.commit()
        db.refresh(place)

        # convert UUID -> str
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
        response = place_schema.PlaceResponse(**response_dict)

    return response

# delete place
async def delete_place(db: AsyncSession, place_id: str) -> place_model.Place:
    # convert str -> UUID
    place_id_bytes = uuid.UUID(place_id).bytes
    
    # delete
    place = db.query(place_model.Place).filter(place_model.Place.place_id == place_id_bytes).first()
    if place:
        db.delete(place)
        db.commit()
    return place