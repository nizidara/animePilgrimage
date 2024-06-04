from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple

import models.anime as anime_model
import schemas.anime as anime_schema

# create
async def request_anime(
        db: AsyncSession, anime_request: anime_schema.AnimeCreate
) -> anime_model.Anime:
    anime = anime_model.Anime(**anime_request.model_dump())
    db.add(anime)
    db.commit()
    db.refresh(anime)

    return anime

# read anime detail
async def get_anime_detail(db: AsyncSession, anime_id: int) -> anime_model.Anime:
    return db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()

# read list
async def get_anime_list(db:AsyncSession) -> List[Tuple[anime_model.Anime]]:
    return db.query(anime_model.Anime).all()

# update flag
async def update_anime_flag(db: AsyncSession, anime_id: int, flag: int) -> anime_model.Anime:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    if anime:
        anime.flag = flag
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