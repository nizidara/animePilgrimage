from fastapi import APIRouter
from typing import List

import schemas.anime as anime_schema

router = APIRouter()


@router.get("/anime", response_model=List[anime_schema.responseAnime])
async def list_anime():
    return [anime_schema.responseAnime(anime_id=1, title="リコリス・リコイル", kana="リコリス・リコイル", introduction="さかなー", flag=2)]


@router.post("/anime", response_model=anime_schema.responseAnime)
async def create_anime(anime_body: anime_schema.sendAnime):
    return anime_schema.responseAnime(anime_id=1, **anime_body.model_dump())


@router.put("/anime/{anime_id}")
async def update_anime():
    pass


@router.delete("/anime/{anime_id}")
async def delete_anime():
    pass