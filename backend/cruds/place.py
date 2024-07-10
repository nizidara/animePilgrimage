from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import aliased
from typing import List, Tuple
import uuid

import models.place as place_model
import models.user as user_model
import schemas.place as place_schema

# create place
async def create_place(
        db: AsyncSession, place_body: place_schema.PlaceCreate
) -> place_schema.PlaceResponse:
    
    # convert str -> UUID
    created_user_name = None
    edited_user_name = None
    if place_body:
        place_dict = place_body.model_dump()
        if place_body.created_user_id is not None:
            place_dict['created_user_id'] = uuid.UUID(place_body.created_user_id).bytes
            created_user = db.query(user_model.User).filter(user_model.User.user_id == place_dict['created_user_id']).first()
            created_user_name = created_user.user_name
        if place_body.edited_user_id is not None:
            place_dict['edited_user_id'] = uuid.UUID(place_body.edited_user_id).bytes
            edited_user = db.query(user_model.User).filter(user_model.User.user_id == place_dict['edited_user_id']).first()
            edited_user_name = edited_user.user_name
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
        response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name)

    return response

# create request place
async def create_request_place(
        db: AsyncSession, place_body: place_schema.PlaceRequestCreate
) -> place_schema.PlaceRequestResponse:
    
    # convert str -> UUID
    user_name = None
    if place_body:
        place_dict = place_body.model_dump()
        place_dict['place_id'] = uuid.UUID(place_body.place_id).bytes
        if place_body.user_id is not None:
            place_dict['user_id'] = uuid.UUID(place_body.user_id).bytes
            user = db.query(user_model.User).filter(user_model.User.user_id == place_dict['user_id']).first()
            user_name = user.user_name
    
    place = place_model.RequestPlace(**place_dict)
    # create
    db.add(place)
    db.commit()
    db.refresh(place)

    # convert UUID -> str
    response = None
    if place:
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=place.user_id))
        response = place_schema.PlaceRequestResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, user_name=user_name)

    return response

# read list
async def get_place_list(db:AsyncSession, name: str, anime_id: int, region_id: int) -> List[Tuple[place_schema.PlaceResponse]]:
    # get
    Created_User = aliased(user_model.User)
    Edited_User = aliased(user_model.User)

    results = db.query(place_model.Place, Created_User.user_name.label('created_user_name'), Edited_User.user_name.label('edited_user_name')).\
        outerjoin(Created_User, place_model.Place.created_user_id == Created_User.user_id).\
        outerjoin(Edited_User, place_model.Place.edited_user_id == Edited_User.user_id).all()
    
    # convert UUID -> str
    response_list = []
    if results:
        for place, created_user_name, edited_user_name in results:
            response_dict = place.__dict__
            response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
            if place.created_user_id is not None:
                response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
            if place.edited_user_id is not None:
                response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
            response_list.append(place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name))

    return response_list

# read detail
async def get_place_detail(db: AsyncSession, place_id: str) -> place_schema.PlaceResponse:
    # convert str -> UUID
    place_id_bytes = uuid.UUID(place_id).bytes

    # get
    Created_User = aliased(user_model.User)
    Edited_User = aliased(user_model.User)
    
    result = db.query(place_model.Place, Created_User.user_name.label('created_user_name'), Edited_User.user_name.label('edited_user_name')).\
        outerjoin(Created_User, place_model.Place.created_user_id == Created_User.user_id).\
        outerjoin(Edited_User, place_model.Place.edited_user_id == Edited_User.user_id).\
        filter(place_model.Place.place_id == place_id_bytes).first()

    # convert UUID -> str
    response = None
    if result:
        place, created_user_name, edited_user_name = result
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
        response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name)

    return response

# read request place list
async def get_request_place_list(db:AsyncSession) -> List[Tuple[place_schema.PlaceRequestResponse]]:
    # get
    results = db.query(place_model.RequestPlace, user_model.User.user_name).outerjoin(user_model.User, place_model.RequestPlace.user_id == user_model.User.user_id).all()
    
    # convert UUID -> str
    response_list = []
    if results:
        for place, user_name in results:
            response_dict = place.__dict__
            response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
            if place.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=place.user_id))
            response_list.append(place_schema.PlaceRequestResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, user_name=user_name))

    return response_list

# read request place detail
async def get_request_place_detail(db: AsyncSession, request_place_id: int) -> place_schema.PlaceRequestResponse:
    # get
    result = db.query(place_model.RequestPlace, user_model.User.user_name).outerjoin(user_model.User, place_model.RequestPlace.user_id == user_model.User.user_id).filter(place_model.RequestPlace.request_place_id == request_place_id).first()

    # convert UUID -> str
    response = None
    if result:
        place, user_name = result
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=place.user_id))
        response = place_schema.PlaceRequestResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, user_name=user_name)

    return response

# update flag
async def update_place_flag(db: AsyncSession, place_id: str, flag: int) -> place_schema.PlaceResponse:
    # convert str -> UUID
    place_id_bytes = uuid.UUID(place_id).bytes
    
    # update flag
    Created_User = aliased(user_model.User)
    Edited_User = aliased(user_model.User)
    
    result = db.query(place_model.Place, Created_User.user_name.label('created_user_name'), Edited_User.user_name.label('edited_user_name')).\
        outerjoin(Created_User, place_model.Place.created_user_id == Created_User.user_id).\
        outerjoin(Edited_User, place_model.Place.edited_user_id == Edited_User.user_id).\
        filter(place_model.Place.place_id == place_id_bytes).first()
    
    response = None
    if result:
        place, created_user_name, edited_user_name = result
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
        response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name)

    return response

# approve request place
async def approve_request_place(db: AsyncSession, request_place_id: int) -> place_schema.PlaceResponse:
    # get
    request = db.query(place_model.RequestPlace).filter(place_model.RequestPlace.request_place_id == request_place_id).first()
    
    response = None
    if request:
        # get
        result = db.query(place_model.Place, user_model.User.user_name).outerjoin(user_model.User, place_model.Place.created_user_id == user_model.User.user_id).filter(place_model.Place.place_id == request.place_id).first()

        if result:
            place, created_user_name = result

            # edit
            if request.request_type == 0:
                # set edit user_id
                place.edited_user_id = request.user_id

                # update place info
                place.name = request.name
                place.latitude = request.latitude
                place.longitude = request.longitude
                place.comment = request.comment
                place.region_id = request.region_id
                db.commit()
                db.refresh(place)

                # delete request place
                db.delete(request)
                db.commit()

            # delete
            elif request.request_type == 1:
                # delete place
                db.delete(place)
                db.commit()
    
            # convert UUID -> str
            edited_user_name = None
            response_dict = place.__dict__
            response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
            if place.created_user_id is not None:
                response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
            if place.edited_user_id is not None:
                response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
                edited_user = db.query(user_model.User).filter(user_model.User.user_id == uuid.UUID(response_dict['edited_user_id']).bytes).first()
                edited_user_name = edited_user.user_name
            response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name)

    return response

# update place(direct)
async def update_place(db: AsyncSession, place_id: str, place_body: place_schema.PlaceCreate) -> place_schema.PlaceResponse:
    # convert str -> UUID
    place_id_bytes = uuid.UUID(place_id).bytes
    place_dict = None
    if place_body:
        place_dict = place_body.model_dump()
        if place_body.created_user_id is not None:
            place_dict['created_user_id'] = uuid.UUID(place_body.created_user_id).bytes
        if place_body.edited_user_id is not None:
            place_dict['edited_user_id'] = uuid.UUID(place_body.edited_user_id).bytes
    
    # update
    place = db.query(place_model.Place).filter(place_model.Place.place_id == place_id_bytes).first()
    
    response = None
    if place:
        for key, value in place_dict.items():
            setattr(place, key, value)
        db.commit()
        db.refresh(place)
    
        # convert UUID -> str
        created_user_name = None
        edited_user_name = None
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
            created_user = db.query(user_model.User).filter(user_model.User.user_id == uuid.UUID(response_dict['created_user_id']).bytes).first()
            created_user_name = created_user.user_name
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
            edited_user = db.query(user_model.User).filter(user_model.User.user_id == uuid.UUID(response_dict['edited_user_id']).bytes).first()
            edited_user_name = edited_user.user_name
        response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name)

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

# delete request place
async def delete_request_place(db: AsyncSession, request_place_id: int) -> place_model.RequestPlace:
    place = db.query(place_model.RequestPlace).filter(place_model.RequestPlace.request_place_id == request_place_id).first()
    if place:
        db.delete(place)
        db.commit()
    return place