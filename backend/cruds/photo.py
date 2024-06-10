from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.anime as anime_model
import schemas.photo as photo_schema

# get anime icon
async def get_anime_icon(db: AsyncSession, anime_id: int) -> photo_schema.AnimeIconResponse:
    anime = db.query(anime_model.Anime).filter(anime_model.Anime.anime_id == anime_id).first()
    response = None
    if anime:
        response = photo_schema.AnimeIconResponse(**anime.__dict__)
    return response

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