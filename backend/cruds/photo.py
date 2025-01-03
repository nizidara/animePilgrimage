from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql.functions import func
from typing import List, Optional
from fastapi import HTTPException
from datetime import datetime, timezone
import uuid

import models.anime as anime_model
import models.photo as photo_model
import models.place as place_model
import models.user as user_model
import schemas.photo as photo_schema

from properties.properties import base_path, upload_directory, anime_photo_directory

# create anime photo
async def create_anime_photo(
        db: AsyncSession, photo_body: photo_schema.AnimePhotoCreate
) -> List[photo_schema.AnimePhotoResponse]:
    
    
    place_name, anime_id, anime_title, user_name = None, None, None, None
    response_list = []
    if photo_body:
        # convert str -> UUID
        photo_dict = photo_body.model_dump()
        photo_dict.pop("images", None)    # delete image field
        photo_dict['place_id'] = uuid.UUID(photo_body.place_id).bytes

        place = db.query(place_model.Place).filter(place_model.Place.place_id == photo_dict['place_id']).first()
        place_name = place.name
        anime_id = place.anime_id
        anime_title = place.anime.title
        if photo_body.user_id is not None:
            photo_dict['user_id'] = uuid.UUID(photo_body.user_id).bytes
            user = db.query(user_model.User).filter(user_model.User.user_id == photo_dict['user_id']).first()
            user_name = user.user_name

        # save images
        saved_image_paths = []
        for index, image in enumerate(photo_body.images):
            image_filename = f"{uuid.uuid4()}_{image.filename}"
            image_path = base_path / anime_photo_directory / image_filename
            save_path = anime_photo_directory / image_filename

            with image_path.open("wb") as buffer:
                buffer.write(await image.read())
            
            saved_image_paths.append((str(save_path), index))

        current_time = datetime.now(tz=timezone.utc)

        # create photo DB
        for file_name, order in saved_image_paths:
            photo = photo_model.AnimePhoto(**photo_dict, file_name=file_name, created_at=current_time, order=order+1)

            # create
            db.add(photo)
            db.commit()
            db.refresh(photo)

            # convert UUID -> str
            if photo:
                response_dict = photo.__dict__.copy()
                response_dict.pop("created_at", None)
                response_dict.pop("order", None)
                response_dict['anime_photo_id'] = str(uuid.UUID(bytes=photo.anime_photo_id))
                response_dict['place_id'] = str(uuid.UUID(bytes=photo.place_id))
                if photo.user_id is not None:
                    response_dict['user_id'] = str(uuid.UUID(bytes=photo.user_id))
                response = photo_schema.AnimePhotoResponse(**response_dict, place_name=place_name, anime_id=anime_id, anime_title=anime_title, user_name=user_name)
                response_list.append(response)

    return response_list

# create real photo
async def create_real_photo(
        db: AsyncSession, photo_body: photo_schema.RealPhotoCreate
) -> List[photo_schema.RealPhotoResponse]:
    
    # convert str -> UUID
    place_name, anime_id, anime_title, user_name = None, None, None, None
    response_list = []
    if photo_body:
        # convert str -> UUID
        photo_dict = photo_body.model_dump()
        photo_dict.pop("images", None)    # delete image field
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

        # save images
        saved_image_paths = []
        for index, image in enumerate(photo_body.images):
            image_filename = f"{uuid.uuid4()}_{image.filename}"
            image_path = base_path / upload_directory / image_filename
            save_path = upload_directory / image_filename

            with image_path.open("wb") as buffer:
                buffer.write(await image.read())
            
            saved_image_paths.append((str(save_path), index))

        current_time = datetime.now(tz=timezone.utc)

        # create photo DB
        for file_name, order in saved_image_paths:
            photo = photo_model.RealPhoto(**photo_dict, file_name=file_name, created_at=current_time, order=order+1)

            # create
            db.add(photo)
            db.commit()
            db.refresh(photo)

            # convert UUID -> str
            if photo:
                response_dict = photo.__dict__.copy()
                response_dict.pop("created_at", None)
                response_dict.pop("order", None)
                response_dict['real_photo_id'] = str(uuid.UUID(bytes=photo.real_photo_id))
                response_dict['place_id'] = str(uuid.UUID(bytes=photo.place_id))
                if photo.user_id is not None:
                    response_dict['user_id'] = str(uuid.UUID(bytes=photo.user_id))
                if photo.comment_id is not None:
                    response_dict['comment_id'] = str(uuid.UUID(bytes=photo.comment_id))
                response = photo_schema.RealPhotoResponse(**response_dict, place_name=place_name, anime_id=anime_id, anime_title=anime_title, user_name=user_name)
                response_list.append(response)

    return response_list

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
async def get_anime_photo_list(db:AsyncSession, place_id: str, page: int = 1, page_size: int = 12) -> photo_schema.PaginatedAnimePhotoResponse:
    # convert UUID -> str
    place_id_bytes = uuid.UUID(place_id).bytes
    
    # get    
    query = select(photo_model.AnimePhoto, user_model.User.user_name, place_model.Place).\
        outerjoin(user_model.User, user_model.User.user_id == photo_model.AnimePhoto.user_id).\
        outerjoin(place_model.Place, place_model.Place.place_id == photo_model.AnimePhoto.place_id).\
        filter(photo_model.AnimePhoto.place_id == place_id_bytes)
    
    # Total Count Query
    total_count_query = select(func.count()).select_from(query.subquery())
    total_count = (db.execute(total_count_query)).scalar()

    # Apply Pagination
    if page < 1 or page_size < 1:
        raise HTTPException(status_code=400, detail="Page and page_size must be positive integers")
    
    offset = (page - 1) * page_size
    query = query.order_by(photo_model.AnimePhoto.created_at.desc(), photo_model.AnimePhoto.order.asc()).offset(offset).limit(page_size)

    results = db.execute(query).all()

    # convert UUID -> str
    response_list = []
    if results:
        for photo, user_name, place in results:
            response_dict = photo.__dict__.copy()
            response_dict.pop("created_at", None)
            response_dict.pop("order", None)
            response_dict['anime_photo_id'] = str(uuid.UUID(bytes=photo.anime_photo_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=photo.place_id))
            if photo.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=photo.user_id))
            response_list.append(photo_schema.AnimePhotoResponse(**response_dict, place_name=place.name, anime_id=place.anime_id, anime_title=place.anime.title, user_name=user_name))

    return photo_schema.PaginatedAnimePhotoResponse(
        total_count=total_count,
        page=page,
        page_size=page_size,
        photos=response_list
    )

# read real photo list
async def get_real_photo_list(db:AsyncSession, place_id: str, comment_id: Optional[str] = None, page: int = 1, page_size: int = 12) -> photo_schema.PaginatedRealPhotoResponse:
    # convert UUID -> str
    place_id_bytes = uuid.UUID(place_id).bytes

    # get    
    query = select(photo_model.RealPhoto, user_model.User.user_name, place_model.Place).\
        outerjoin(user_model.User, user_model.User.user_id == photo_model.RealPhoto.user_id).\
        outerjoin(place_model.Place, place_model.Place.place_id == photo_model.RealPhoto.place_id).\
        filter(photo_model.RealPhoto.place_id == place_id_bytes)
    
    # filter by anime_id:
    if comment_id is not None:
        # convert str -> UUID
        comment_id_bytes = uuid.UUID(comment_id).bytes
        query = query.where(photo_model.RealPhoto.comment_id == comment_id_bytes)

    # Total Count Query
    total_count_query = select(func.count()).select_from(query.subquery())
    total_count = (db.execute(total_count_query)).scalar()

    # Apply Pagination
    if page < 1 or page_size < 1:
        raise HTTPException(status_code=400, detail="Page and page_size must be positive integers")
    
    offset = (page - 1) * page_size
    query = query.order_by(photo_model.RealPhoto.created_at.asc(), photo_model.RealPhoto.order.asc()).offset(offset).limit(page_size)

    results = db.execute(query).all()
    
    # convert UUID -> str
    response_list = []
    if results:
        for photo, user_name, place in results:
            response_dict = photo.__dict__.copy()
            response_dict.pop("created_at", None)
            response_dict.pop("order", None)
            response_dict['real_photo_id'] = str(uuid.UUID(bytes=photo.real_photo_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=photo.place_id))
            if photo.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=photo.user_id))
            if photo.comment_id is not None:
                response_dict['comment_id'] = str(uuid.UUID(bytes=photo.comment_id))
            response_list.append(photo_schema.RealPhotoResponse(**response_dict, place_name=place.name, anime_id=place.anime_id, anime_title=place.anime.title, user_name=user_name))

    return photo_schema.PaginatedRealPhotoResponse(
        total_count=total_count,
        page=page,
        page_size=page_size,
        photos=response_list
    )

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