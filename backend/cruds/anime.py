from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional, Tuple
from datetime import datetime, timezone
import uuid

import models.anime as anime_model
import models.user as user_model
import models.place as place_model
import schemas.anime as anime_schema
import logic.input as input_logic
import logic.upload as upload_logic

# create anime
async def request_anime(
        db: AsyncSession, anime_request: anime_schema.AnimeCreate
) -> anime_schema.AnimeResponse:
    
    anime_dict = anime_request.model_dump()
    anime_dict.pop("icon", None)    # delete icon field
    if anime_request.introduction:
        anime_dict['introduction'] = input_logic.normalize_break(anime_request.introduction)

    # save icon
    file_name = None
    if anime_request.icon:
        image_filename = f"{uuid.uuid4()}_{anime_request.icon.filename}"
        s3_path = f"icons/{image_filename}"
        s3_url = upload_logic.upload_file_to_s3(anime_request.icon.file, s3_path)
        file_name = s3_url

    anime = anime_model.Anime(**anime_dict, file_name=file_name)
    db.add(anime)
    db.commit()
    db.refresh(anime)

    response = None
    if anime:
        response_dict = anime.__dict__
        response = anime_schema.AnimeResponse(**response_dict)

    return response

# create edit request anime
async def edit_request_anime(
        db: AsyncSession, anime_edit: anime_schema.AnimeEditCreate
) -> anime_schema.AnimeEditResponse:
    
    # convert str -> UUID
    anime_edit_dict = anime_edit.model_dump()
    anime_edit_dict.pop("icon", None)    # delete icon field
    user_name = None
    if anime_edit.user_id is not None:
        anime_edit_dict['user_id'] = uuid.UUID(anime_edit.user_id).bytes
        user = db.query(user_model.User).filter(user_model.User.user_id == anime_edit_dict['user_id']).first()
        user_name = user.user_name
    anime_edit_dict['contents'] = input_logic.normalize_break(anime_edit.contents)
    if anime_edit.introduction:
        anime_edit_dict['introduction'] = input_logic.normalize_break(anime_edit.introduction)
    # save icon
    file_name = None
    if anime_edit.icon:
        image_filename = f"{uuid.uuid4()}_{anime_edit.icon.filename}"
        s3_path = f"icons/{image_filename}"
        s3_url = upload_logic.upload_file_to_s3(anime_edit.icon.file, s3_path)
        file_name = s3_url

    current_time = datetime.now(tz=timezone.utc)

    edit = anime_model.RequestAnime(**anime_edit_dict, file_name=file_name, request_date=current_time)

    # create
    db.add(edit)
    db.commit()
    db.refresh(edit)

    # convert UUID -> str
    response = None
    if edit:
        response_dict = edit.__dict__
        if edit.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=edit.user_id))
        response = anime_schema.AnimeEditResponse(**response_dict, user_name=user_name)

    return response

# read anime detail
async def get_anime_detail(db: AsyncSession, anime_id: int) -> anime_schema.AnimeResponse:
    return db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()

# read list
async def get_anime_list(db:AsyncSession, flag: Optional[int] = 1) -> List[Tuple[anime_schema.AnimeResponse]]:
    query = select(anime_model.Anime).order_by(anime_model.Anime.kana)

    if flag is not None:
        query = query.where(anime_model.Anime.flag == flag)

    return db.execute(query).scalars().all()

# read request edit anime detail
async def get_request_anime_detail(db: AsyncSession, request_anime_id: int) -> anime_schema.AnimeEditResponse:

    # read
    result = db.query(anime_model.RequestAnime, user_model.User.user_name).outerjoin(user_model.User, anime_model.RequestAnime.user_id == user_model.User.user_id).filter(anime_model.RequestAnime.request_anime_id == request_anime_id).first()

    # convert UUID -> str
    response = None
    if result:
        request_anime, user_name = result
        response_dict = request_anime.__dict__
        if request_anime.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=request_anime.user_id))
        response = anime_schema.AnimeEditResponse(**response_dict, user_name=user_name)

    return response

# read request edit anime list
async def get_request_anime_list(db: AsyncSession) -> List[Tuple[anime_schema.AnimeEditResponse]]:
    # read
    results = db.query(anime_model.RequestAnime, user_model.User.user_name).\
        outerjoin(user_model.User, anime_model.RequestAnime.user_id == user_model.User.user_id).\
        order_by(anime_model.RequestAnime.request_date.desc()).all()

    # convert UUID -> str
    response_list = []
    if results:
        for request_anime, user_name in results:
            response_dict = request_anime.__dict__
            if request_anime.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=request_anime.user_id))
            response_list.append(anime_schema.AnimeEditResponse(**response_dict, user_name=user_name))

    return response_list

# update flag
async def update_anime_flag(db: AsyncSession, anime_id: int, flag: int) -> anime_schema.AnimeResponse:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    if anime:
        anime.flag = flag

        # if update flag 0 or 2, place.flag = 1 update 9
        if flag in [0, 2]:
            db.query(place_model.Place).filter(
                place_model.Place.anime_id == anime_id,  
                place_model.Place.flag == 1              
            ).update({place_model.Place.flag: 9})  
        # if update flag 1, place.flag = 9 update 1
        elif flag ==1:
            db.query(place_model.Place).filter(
                place_model.Place.anime_id == anime_id,  
                place_model.Place.flag == 9
            ).update({place_model.Place.flag: 1})

        db.commit()
        db.refresh(anime)
    return anime

# approve request edit anime
async def approve_edit_request_anime(db: AsyncSession, request_anime_id: int) -> anime_schema.AnimeResponse:
    edit = db.query(anime_model.RequestAnime).filter(anime_model.RequestAnime.request_anime_id == request_anime_id).first()
    anime = None
    if edit:
        anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == edit.anime_id).first()
        if anime:
            anime.title = edit.title
            anime.introduction = edit.introduction
            
            if edit.file_name:
                if anime.file_name:
                    upload_logic.delete_file_from_s3(anime.file_name)
                anime.file_name = edit.file_name

            # update
            db.commit()
            db.refresh(anime)

            # request DB delete
            db.delete(edit)
            db.commit()
    return anime

# update anime(direct)
async def update_anime(db: AsyncSession, anime_id: int, anime_body: anime_schema.AnimeCreate) -> anime_schema.AnimeResponse:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    if anime:
        anime.title = anime_body.title
        anime.kana = anime_body.kana
        anime.introduction = anime_body.introduction
        anime.flag = anime_body.flag
        
        # save new icon if not null
        if anime_body.icon:
            # delete icon file
            if anime.file_name:
                upload_logic.delete_file_from_s3(anime.file_name)

            image_filename = f"{uuid.uuid4()}_{anime_body.icon.filename}"
            s3_path = f"icons/{image_filename}"
            s3_url = upload_logic.upload_file_to_s3(anime_body.icon.file, s3_path)
            file_name = s3_url
            
            anime.file_name = file_name
        
        db.commit()
        db.refresh(anime)

    return anime

# delete anime
async def delete_anime(db: AsyncSession, anime_id: int) -> anime_model.Anime:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    if anime:
        # delete icon file
        if anime.file_name:
            upload_logic.delete_file_from_s3(anime.file_name)

        db.delete(anime)
        db.commit()
    return anime

# delete edit request anime
async def delete_edit_request_anime(db: AsyncSession, request_anime_id: int) -> anime_model.RequestAnime:
    result = db.query(anime_model.RequestAnime).filter(anime_model.RequestAnime.request_anime_id == request_anime_id).first()
    if result:
        # delete icon file
        if result.file_name:
            upload_logic.delete_file_from_s3(result.file_name)
        db.delete(result)
        db.commit()
    return result