from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.anime as anime_model
import schemas.anime as anime_schema

# create anime
async def request_anime(
        db: AsyncSession, anime_request: anime_schema.AnimeCreate
) -> anime_model.Anime:
    anime = anime_model.Anime(**anime_request.model_dump())
    db.add(anime)
    db.commit()
    db.refresh(anime)

    return anime

# create edit request anime
async def edit_request_anime(
        db: AsyncSession, anime_edit: anime_schema.AnimeEditCreate
) -> anime_model.RequestAnime:
    
    # convert str -> UUID
    anime_edit_dict = anime_edit.model_dump()
    if anime_edit.user_id is not None:
        anime_edit_dict['user_id'] = uuid.UUID(anime_edit.user_id).bytes
    edit = anime_model.RequestAnime(**anime_edit_dict)

    # create
    db.add(edit)
    db.commit()
    db.refresh(edit)

    # convert UUID -> str
    if edit:
        response_dict = edit.__dict__
        if edit.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=edit.user_id))
        response = anime_schema.AnimeEditResponse(**response_dict)

    return response

# read anime detail
async def get_anime_detail(db: AsyncSession, anime_id: int) -> anime_model.Anime:
    return db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()

# read list
async def get_anime_list(db:AsyncSession) -> List[Tuple[anime_model.Anime]]:
    return db.query(anime_model.Anime).order_by(anime_model.Anime.kana).all()

# read request edit anime detail
async def get_request_edit_anime_detail(db: AsyncSession, request_anime_id: int) -> anime_model.RequestAnime:

    # read
    result = db.query(anime_model.RequestAnime).filter(anime_model.RequestAnime.request_anime_id == request_anime_id).first()

    # convert UUID -> str
    if result:
        response_dict = result.__dict__
        if result.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=result.user_id))
        response = anime_schema.AnimeEditResponse(**response_dict)

    return response

# update flag
async def update_anime_flag(db: AsyncSession, anime_id: int, flag: int) -> anime_model.Anime:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    if anime:
        anime.flag = flag
        db.commit()
        db.refresh(anime)
    return anime

# update anime(direct)
async def update_anime(db: AsyncSession, anime_id: int, anime_body: anime_schema.AnimeCreate) -> anime_model.Anime:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    if anime:
        for key, value in anime_body.model_dump().items():
            setattr(anime, key, value)
        db.commit()
        db.refresh(anime)
    return anime

# delete anime
async def delete_anime(db: AsyncSession, anime_id: int) -> anime_model.Anime:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    if anime:
        db.delete(anime)
        db.commit()
    return anime

# delete edit request anime
async def delete_edit_request_anime(db: AsyncSession, request_anime_id: int) -> anime_model.RequestAnime:
    result = db.query(anime_model.RequestAnime).filter(anime_model.RequestAnime.request_anime_id == request_anime_id).first()
    if result:
        db.delete(result)
        db.commit()
    return result