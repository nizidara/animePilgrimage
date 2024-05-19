from fastapi import APIRouter
from typing import List

import schemas.anime as anime_schema

router = APIRouter()

# get anime info list(sort by kana)
@router.get("/anime", response_model=List[anime_schema.AnimeResponse])
async def list_anime():
    return [anime_schema.AnimeResponse(anime_id=1, title="リコリス・リコイル", kana="リコリス・リコイル", introduction="さかなー", flag=2)]

# get anime info detail
@router.get("/anime/{anime_id}", response_model=anime_schema.AnimeResponse)
async def detail_anime(anime_id: int):
    return anime_schema.AnimeResponse(anime_id=anime_id, title="リコリス・リコイル", kana="リコリス・リコイル", introduction="ちんあなご～", flag=0)

# get anime info by title
@router.get("/anime/title/{title}", response_model=anime_schema.AnimeResponse)
async def get_anime_by_title(title: str):
    return anime_schema.AnimeResponse(anime_id=1, title=title, kana="リコリス・リコイル", introduction="さかなー", flag=2)

# create anime info request
@router.post("/anime", response_model=anime_schema.AnimeResponse)
async def create_anime(anime_body: anime_schema.AnimeCreate):
    return anime_schema.AnimeResponse(anime_id=1, **anime_body.model_dump())

# create edit anime info request
@router.post("/edit/anime", response_model=anime_schema.AnimeEditResponse)
async def create_edit_anime(anime_body: anime_schema.AnimeEditCreate):
    return anime_schema.AnimeEditResponse(request_anime_id=1, **anime_body.model_dump())

# update anime.flag = 1 for display
@router.put("/anime/{anime_id}", response_model=anime_schema.AnimeResponse)
async def approve_anime(anime_id: int):
    return anime_schema.AnimeResponse(anime_id=anime_id, title="リコリス・リコイル", kana="リコリス・リコイル", introduction="ちんあなご～", flag=1)

# update anime.flag = 0 for not display
@router.put("/anime/disable/{anime_id}", response_model=anime_schema.AnimeResponse)
async def disable_anime(anime_id: int):
    return anime_schema.AnimeResponse(anime_id=anime_id, title="リコリス・リコイル", kana="リコリス・リコイル", introduction="ちんあなご～", flag=0)

# update anime.title or anime.introduction for edit function
@router.put("/edit/anime/{anime_id}", response_model=anime_schema.AnimeResponse)
async def approve_edit_anime(anime_id: int, anime_body: anime_schema.AnimeBase):
    return anime_schema.AnimeResponse(anime_id=anime_id, **anime_body.model_dump(), kana="リコリス・リコイル", flag=1)

# update anime info excluding anime_id 
@router.put("/admin/edit/anime/{anime_id}", response_model=anime_schema.AnimeResponse)
async def admin_edit_anime(anime_id: int, anime_body: anime_schema.AnimeCreate):
    return anime_schema.AnimeResponse(anime_id=anime_id, **anime_body.model_dump())

# delete anime info from DB
@router.delete("/anime/{anime_id}")
async def delete_anime(anime_id: int):
    pass

# delete request anime from DB
@router.delete("/edit/anime/{request_anime_id}")
async def delete_request_anime(request_anime_id: int):
    pass