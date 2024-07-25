from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.anime as anime_model
import models.photo as photo_model
import models.place as place_model
import models.user as user_model
import schemas.photo as photo_schema

# create anime photo
async def create_anime_photo(
        db: AsyncSession, photo_body: photo_schema.AnimePhotoCreate
) -> photo_schema.AnimePhotoResponse:
    
    # convert str -> UUID
    place_name, anime_id, anime_title, user_name = None, None, None, None
    if photo_body:
        photo_dict = photo_body.model_dump()
        photo_dict['place_id'] = uuid.UUID(photo_body.place_id).bytes
        place = db.query(place_model.Place).filter(place_model.Place.place_id == photo_dict['place_id']).first()
        place_name = place.name
        anime_id = place.anime_id
        anime_title = place.anime.title
        if photo_body.user_id is not None:
            photo_dict['user_id'] = uuid.UUID(photo_body.user_id).bytes
            user = db.query(user_model.User).filter(user_model.User.user_id == photo_dict['user_id']).first()
            user_name = user.user_name
    photo = photo_model.AnimePhoto(**photo_dict)

    # create
    db.add(photo)
    db.commit()
    db.refresh(photo)

    # convert UUID -> str
    response = None
    if photo:
        response_dict = photo.__dict__
        response_dict['anime_photo_id'] = str(uuid.UUID(bytes=photo.anime_photo_id))
        response_dict['place_id'] = str(uuid.UUID(bytes=photo.place_id))
        if photo.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=photo.user_id))
        response = photo_schema.AnimePhotoResponse(**response_dict, place_name=place_name, anime_id=anime_id, anime_title=anime_title, user_name=user_name)

    return response

# create real photo
async def create_real_photo(
        db: AsyncSession, photo_body: photo_schema.RealPhotoCreate
) -> photo_schema.RealPhotoResponse:
    
    # convert str -> UUID
    place_name, anime_id, anime_title, user_name = None, None, None, None
    if photo_body:
        photo_dict = photo_body.model_dump()
        photo_dict['place_id'] = uuid.UUID(photo_body.place_id).bytes
        place = db.query(place_model.Place).filter(place_model.Place.place_id == photo_dict['place_id']).first()
        place_name = place.name
        anime_id = place.anime_id
        anime_title = place.anime.title
        if photo_body.user_id is not None:
            photo_dict['user_id'] = uuid.UUID(photo_body.user_id).bytes
            user = db.query(user_model.User).filter(user_model.User.user_id == photo_dict['user_id']).first()
            user_name = user.user_name
        if photo_body.comment_id is not None:
            photo_dict['comment_id'] = uuid.UUID(photo_body.comment_id).bytes
    photo = photo_model.RealPhoto(**photo_dict)

    # create
    db.add(photo)
    db.commit()
    db.refresh(photo)

    # convert UUID -> str
    response = None
    if photo:
        response_dict = photo.__dict__
        response_dict['real_photo_id'] = str(uuid.UUID(bytes=photo.real_photo_id))
        response_dict['place_id'] = str(uuid.UUID(bytes=photo.place_id))
        if photo.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=photo.user_id))
        if photo.comment_id is not None:
            response_dict['comment_id'] = str(uuid.UUID(bytes=photo.comment_id))
        response = photo_schema.RealPhotoResponse(**response_dict, place_name=place_name, anime_id=anime_id, anime_title=anime_title, user_name=user_name)

    return response

# read anime icon
async def get_anime_icon(db: AsyncSession, anime_id: int) -> photo_schema.AnimeIconResponse:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    response = None
    if anime:
        response = photo_schema.AnimeIconResponse(**anime.__dict__)
    return response

# read place icon
async def get_place_icon(db: AsyncSession, place_id: str) -> photo_schema.PlacePhotoIconResponse:
    # convert UUID -> str
    place_id_bytes = uuid.UUID(place_id).bytes

    # get
    # icon = db.query(photo_model.PlaceIcon).filter(photo_model.PlaceIcon.place_id == place_id_bytes).first()
    results = db.query(photo_model.PlaceIcon, photo_model.AnimePhoto.file_name, place_model.Place.name).\
        outerjoin(photo_model.AnimePhoto, photo_model.PlaceIcon.anime_photo_id == photo_model.AnimePhoto.anime_photo_id).\
        outerjoin(place_model.Place, place_model.Place.place_id == photo_model.PlaceIcon.place_id).filter(photo_model.PlaceIcon.place_id == place_id_bytes).first()

    # convert str -> UUID
    response = None
    if results:
        icon, file_name, place_name = results
        if icon and icon.anime_photo_id is not None:
            response_dict = icon.__dict__
            response_dict['place_id'] = str(uuid.UUID(bytes=icon.place_id))
            response_dict['anime_photo_id'] = str(uuid.UUID(bytes=icon.anime_photo_id))
            response = photo_schema.PlacePhotoIconResponse(**response_dict, file_name=file_name, place_name=place_name)
    return response

# read anime photo list
async def get_anime_photo_list(db:AsyncSession, place_id: str) -> List[Tuple[photo_schema.AnimePhotoResponse]]:
    # convert UUID -> str
    place_id_bytes = uuid.UUID(place_id).bytes

    # get
    results = db.query(photo_model.AnimePhoto, user_model.User.user_name, place_model.Place).\
        outerjoin(user_model.User, user_model.User.user_id == photo_model.AnimePhoto.user_id).\
        outerjoin(place_model.Place, photo_model.AnimePhoto.place_id == place_model.Place.place_id).\
        filter(photo_model.AnimePhoto.place_id == place_id_bytes).all()

    # convert UUID -> str
    response_list = []
    if results:
        for photo, user_name, place in results:
            response_dict = photo.__dict__
            response_dict['anime_photo_id'] = str(uuid.UUID(bytes=photo.anime_photo_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=photo.place_id))
            if photo.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=photo.user_id))
            response_list.append(photo_schema.AnimePhotoResponse(**response_dict, place_name=place.name, anime_id=place.anime_id, anime_title=place.anime.title, user_name=user_name))

    return response_list

# read real photo list
async def get_real_photo_list(db:AsyncSession, place_id: str, comment_id: str = None) -> List[Tuple[photo_schema.RealPhotoResponse]]:
    # convert UUID -> str
    place_id_bytes = uuid.UUID(place_id).bytes

    # get
    results = db.query(photo_model.RealPhoto, user_model.User.user_name, place_model.Place).filter(photo_model.RealPhoto.place_id == place_id_bytes).\
        outerjoin(user_model.User, user_model.User.user_id == photo_model.RealPhoto.user_id).\
        outerjoin(place_model.Place, place_model.Place.place_id == photo_model.RealPhoto.place_id).\
        filter(photo_model.RealPhoto.place_id == place_id_bytes).all()
    
    # convert UUID -> str
    response_list = []
    if results:
        for photo, user_name, place in results:
            response_dict = photo.__dict__
            response_dict['real_photo_id'] = str(uuid.UUID(bytes=photo.real_photo_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=photo.place_id))
            if photo.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=photo.user_id))
            if photo.comment_id is not None:
                response_dict['comment_id'] = str(uuid.UUID(bytes=photo.comment_id))
            response_list.append(photo_schema.RealPhotoResponse(**response_dict, place_name=place.name, anime_id=place.anime_id, anime_title=place.anime.title, user_name=user_name))

    return response_list

# update anime icon
async def update_anime_icon(db: AsyncSession, anime_id: int, file_name: str) -> photo_schema.AnimeIconResponse:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    response = None
    if anime:
        anime.file_name = file_name
        db.commit()
        db.refresh(anime)

        response = photo_schema.AnimeIconResponse(**anime.__dict__)
    return response

# update or create place icon
async def update_place_icon(db: AsyncSession, place_icon_body: photo_schema.PlacePhotoIconCreate) -> photo_schema.PlacePhotoIconResponse:
    # convert UUID -> str
    anime_photo_id_bytes = uuid.UUID(place_icon_body.anime_photo_id).bytes
    # get place_id uuid
    if place_icon_body.place_id is not None:
        place_id_bytes = uuid.UUID(place_icon_body.place_id).bytes
    else:
        photo = db.query(photo_model.AnimePhoto).filter(photo_model.AnimePhoto.anime_photo_id == anime_photo_id_bytes).first()
        place_id_bytes = photo.place_id
    
    # update or create
    icon = db.query(photo_model.PlaceIcon).filter(photo_model.PlaceIcon.place_id == place_id_bytes).first()
    if icon is not None:
        icon.anime_photo_id = anime_photo_id_bytes
        db.commit()
        db.refresh(icon)
    else:
        icon = photo_model.PlaceIcon(place_id = place_id_bytes, anime_photo_id = anime_photo_id_bytes) 
        db.add(icon)
        db.commit()
        db.refresh(icon)
    
    # convert UUID -> str
    response = None
    file_name, place_name = None, None
    if icon:
        response_dict = icon.__dict__
        response_dict['place_id'] = str(uuid.UUID(bytes=icon.place_id))
        response_dict['anime_photo_id'] = str(uuid.UUID(bytes=icon.anime_photo_id))
        file_name = db.query(photo_model.AnimePhoto).filter(photo_model.AnimePhoto.anime_photo_id == uuid.UUID(response_dict['anime_photo_id']).bytes).first().file_name
        place_name = db.query(place_model.Place).filter(place_model.Place.place_id == uuid.UUID(response_dict['place_id']).bytes).first().name
        response = photo_schema.PlacePhotoIconResponse(**response_dict, file_name=file_name, place_name=place_name)
    return response

# delete anime photo
async def delete_anime_photo(db: AsyncSession, anime_photo_id: str) -> photo_model.AnimePhoto:
    # convert str -> UUID
    anime_photo_id_bytes = uuid.UUID(anime_photo_id).bytes
    
    # delete
    photo = db.query(photo_model.AnimePhoto).filter(photo_model.AnimePhoto.anime_photo_id == anime_photo_id_bytes).first()
    if photo:
        db.delete(photo)
        db.commit()
    return photo

# delete real photo
async def delete_real_photo(db: AsyncSession, real_photo_id: str) -> photo_model.RealPhoto:
    # convert str -> UUID
    real_photo_id_bytes = uuid.UUID(real_photo_id).bytes
    
    # delete
    photo = db.query(photo_model.RealPhoto).filter(photo_model.RealPhoto.real_photo_id == real_photo_id_bytes).first()
    if photo:
        db.delete(photo)
        db.commit()
    return photo