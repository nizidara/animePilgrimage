from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import aliased
from typing import List, Tuple, Optional
import uuid

import cruds.photo as photo_crud
import models.place as place_model
import models.user as user_model
import models.photo as photo_model
import schemas.place as place_schema
import schemas.photo as photo_schema

# create place
async def create_place(
        db: AsyncSession, place_body: place_schema.PlaceCreate
) -> place_schema.PlaceResponse:
    
    # convert str -> UUID
    created_user_name = None
    edited_user_name = None
    if place_body:
        place_dict = place_body.model_dump()
        place_dict.pop("images", None)    # delete image field
        place_dict.pop("icon_index", None)
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

    # save images
    file_names_response = []
    icon_file_name_response = None
    if place_body.images:
        photo_body = photo_schema.AnimePhotoCreate(
            images=place_body.images,
            place_id=str(uuid.UUID(bytes=place.place_id)),
            user_id=place_body.created_user_id,
        )
        photo_response = await photo_crud.create_anime_photo(db=db, photo_body=photo_body)
        for photo in photo_response:
            file_names_response.append(photo.file_name)

        # create icon
        if place_body.icon_index is not None:
            if photo_response[place_body.icon_index].anime_photo_id:
                place_icon_body = photo_schema.PlacePhotoIconCreate(
                    anime_photo_id=photo_response[place_body.icon_index].anime_photo_id,
                    place_id=photo_response[place_body.icon_index].place_id,
                )
                icon_response = await photo_crud.update_place_icon(db=db, place_icon_body=place_icon_body)
                icon_file_name_response = icon_response.file_name



    # convert UUID -> str
    response = None
    if place:
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
        response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name, place_icon=icon_file_name_response, anime_icon=place.anime.file_name, file_names=file_names_response)

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
        response = place_schema.PlaceRequestResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, anime_icon=place.anime.file_name, user_name=user_name)

    return response

# read list
async def get_place_list(db:AsyncSession, name: Optional[str] = None, anime_id: Optional[int] = None, region_id: Optional[int] = None) -> List[Tuple[place_schema.PlaceResponse]]:
    # get
    Created_User = aliased(user_model.User)
    Edited_User = aliased(user_model.User)
 
    query = select(place_model.Place, Created_User.user_name.label('created_user_name'), Edited_User.user_name.label('edited_user_name'), photo_model.PlaceIcon, photo_model.AnimePhoto.file_name).\
        outerjoin(Created_User, place_model.Place.created_user_id == Created_User.user_id).\
        outerjoin(Edited_User, place_model.Place.edited_user_id == Edited_User.user_id).\
        outerjoin(photo_model.PlaceIcon, place_model.Place.place_id == photo_model.PlaceIcon.place_id).\
        outerjoin(photo_model.AnimePhoto, photo_model.PlaceIcon.anime_photo_id == photo_model.AnimePhoto.anime_photo_id)
    
    # filter by anime_id:
    if anime_id is not None:
        query = query.where(place_model.Place.anime_id == anime_id)

    # filter by region_id
    if region_id is not None:
        query = query.where(place_model.Place.region_id == region_id)

    # filter by name
    if name is not None:
        query = query.where(place_model.Place.name.like(f'%{name}%'))

    # sort by comment_date in descending order
    query = query.order_by(place_model.Place.name)

    results = db.execute(query).all()

    # get anime photo file names
    # now not to get file names in placeList
    
    # convert UUID -> str
    response_list = []
    if results:
        for place, created_user_name, edited_user_name, _, place_icon in results:
            response_dict = place.__dict__
            response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
            if place.created_user_id is not None:
                response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
            if place.edited_user_id is not None:
                response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
            response_list.append(place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name, place_icon=place_icon, anime_icon=place.anime.file_name, file_names=[]))

    return response_list

# read detail
async def get_place_detail(db: AsyncSession, place_id: str) -> place_schema.PlaceResponse:
    # convert str -> UUID
    place_id_bytes = uuid.UUID(place_id).bytes

    # get
    Created_User = aliased(user_model.User)
    Edited_User = aliased(user_model.User)
    
    result = db.query(place_model.Place, Created_User.user_name.label('created_user_name'), Edited_User.user_name.label('edited_user_name'), photo_model.PlaceIcon, photo_model.AnimePhoto.file_name).\
        outerjoin(Created_User, place_model.Place.created_user_id == Created_User.user_id).\
        outerjoin(Edited_User, place_model.Place.edited_user_id == Edited_User.user_id).\
        outerjoin(photo_model.PlaceIcon, place_model.Place.place_id == photo_model.PlaceIcon.place_id).\
        outerjoin(photo_model.AnimePhoto, photo_model.PlaceIcon.anime_photo_id == photo_model.AnimePhoto.anime_photo_id).\
        filter(place_model.Place.place_id == place_id_bytes).first()
    
    # convert UUID -> str
    response = None
    file_names_response = []
    if result:
        place, created_user_name, edited_user_name, _, place_icon = result
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))

        # get anime photo file names
        anime_photo_response = await photo_crud.get_anime_photo_list(db=db, place_id=place_id)
        if anime_photo_response:
            file_names_response = [item.file_name for item in anime_photo_response]

        response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name, place_icon=place_icon, anime_icon=place.anime.file_name, file_names=file_names_response)

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
            response_list.append(place_schema.PlaceRequestResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, anime_icon=place.anime.file_name, user_name=user_name))

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
        response = place_schema.PlaceRequestResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, anime_icon=place.anime.file_name, user_name=user_name)

    return response

# update flag
async def update_place_flag(db: AsyncSession, place_id: str, flag: int) -> place_schema.PlaceResponse:
    # convert str -> UUID
    place_id_bytes = uuid.UUID(place_id).bytes
    
    # update flag
    Created_User = aliased(user_model.User)
    Edited_User = aliased(user_model.User)
    
    result = db.query(place_model.Place, Created_User.user_name.label('created_user_name'), Edited_User.user_name.label('edited_user_name'), photo_model.PlaceIcon, photo_model.AnimePhoto.file_name).\
        outerjoin(Created_User, place_model.Place.created_user_id == Created_User.user_id).\
        outerjoin(Edited_User, place_model.Place.edited_user_id == Edited_User.user_id).\
        outerjoin(photo_model.PlaceIcon, place_model.Place.place_id == photo_model.PlaceIcon.place_id).\
        outerjoin(photo_model.AnimePhoto, photo_model.PlaceIcon.anime_photo_id == photo_model.AnimePhoto.anime_photo_id).\
        filter(place_model.Place.place_id == place_id_bytes).first()
    
    response = None
    file_names_response = []
    if result:
        place, created_user_name, edited_user_name, _, place_icon = result
        place.flag = flag
        db.commit()
        db.refresh(place)

        # get anime photo file names
        anime_photo_response = await photo_crud.get_anime_photo_list(db=db, place_id=place_id)
        if anime_photo_response:
            file_names_response = [item.file_name for item in anime_photo_response]

        # convert UUID -> str
        response_dict = place.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=place.place_id))
        if place.created_user_id is not None:
            response_dict['created_user_id'] = str(uuid.UUID(bytes=place.created_user_id))
        if place.edited_user_id is not None:
            response_dict['edited_user_id'] = str(uuid.UUID(bytes=place.edited_user_id))
        response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name, place_icon=place_icon, anime_icon=place.anime.file_name, file_names=file_names_response)

    return response

# approve request place
async def approve_request_place(db: AsyncSession, request_place_id: int) -> place_schema.PlaceResponse:
    # get
    request = db.query(place_model.RequestPlace).filter(place_model.RequestPlace.request_place_id == request_place_id).first()
    
    response = None
    if request:
        # get
        result = db.query(place_model.Place, user_model.User.user_name).\
        outerjoin(user_model.User, place_model.Place.created_user_id == user_model.User.user_id).\
        filter(place_model.Place.place_id == request.place_id).first()

        if result:
            place, created_user_name = result
            region_name = None
            anime_title = None
            file_names_response = []

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

                region_name = place.region.region_name
                anime_title = place.anime.title
                anime_icon = place.anime.file_name
                icon = await photo_crud.get_place_icon(db=db, place_id=str(uuid.UUID(bytes=place.place_id)))
                if icon is not None:
                    place_icon = icon.file_name

            # delete
            elif request.request_type == 1:
                region_name = place.region.region_name
                anime_title = place.anime.title
                anime_icon = place.anime.file_name

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

            # get anime photo file names
            anime_photo_response = await photo_crud.get_anime_photo_list(db=db, place_id=response_dict['place_id'])
            if anime_photo_response:
                file_names_response = [item.file_name for item in anime_photo_response]
            
            response = place_schema.PlaceResponse(**response_dict, region_name=region_name, anime_title=anime_title, created_user_name=created_user_name, edited_user_name=edited_user_name, place_icon=place_icon, anime_icon=anime_icon, file_names=file_names_response)

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
        place_icon = None
        file_names_response = []
        
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

        # get place icon
        icon = await photo_crud.get_place_icon(db=db, place_id=place_id)
        if icon is not None:
            place_icon = icon.file_name
        # get anime photo file names
        anime_photo_response = await photo_crud.get_anime_photo_list(db=db, place_id=place_id)
        if anime_photo_response:
            file_names_response = [item.file_name for item in anime_photo_response]

        response = place_schema.PlaceResponse(**response_dict, region_name=place.region.region_name, anime_title=place.anime.title, created_user_name=created_user_name, edited_user_name=edited_user_name, place_icon=place_icon, anime_icon=place.anime.file_name, file_names=file_names_response)

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