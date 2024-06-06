from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.place as place_model
import schemas.place as place_schema

# create anime
async def create_place(
        db: AsyncSession, place_body: place_schema.PlaceCreate
) -> place_model.Place:
    
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
    if place:
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
        response = place_schema.PlaceResponse(**response_dict)

    return response