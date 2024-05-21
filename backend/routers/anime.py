from fastapi import APIRouter
from typing import List

import schemas.anime as anime_schema

router = APIRouter(prefix="/anime", tags=["anime"])

# get anime info detail
@router.get("/{anime_id}", response_model=anime_schema.AnimeResponse)
async def anime_detail(anime_id: int):
    return anime_schema.AnimeResponse(anime_id=anime_id, title="リコリス・リコイル", kana="リコリス・リコイル", introduction="ちんあなご～", flag=0)

# get anime info list(sort by kana)
@router.get("/search/", response_model=List[anime_schema.AnimeResponse])
async def anime_list(title: str = None):
    if title is None:
        title="リコリス・リコイル"
    return [anime_schema.AnimeResponse(anime_id=1, title=title, kana="リコリス・リコイル", introduction="さかなー", flag=2)]

# create anime info request
@router.post("", response_model=anime_schema.AnimeResponse)
async def create_anime(anime_body: anime_schema.AnimeCreate):
    return anime_schema.AnimeResponse(anime_id=1, **anime_body.model_dump())

# create edit anime info request
@router.post("/edit", response_model=anime_schema.AnimeEditResponse)
async def create_anime_edit(anime_body: anime_schema.AnimeEditCreate):
    return anime_schema.AnimeEditResponse(request_anime_id=1, **anime_body.model_dump())

# update anime.flag = 1 for display or anime.flag = 0 for not display
@router.put("/{anime_id}", response_model=anime_schema.AnimeResponse)
async def update_anime_flag(anime_id: int, flag: int):
    return anime_schema.AnimeResponse(anime_id=anime_id, title="リコリス・リコイル", kana="リコリス・リコイル", introduction="ちんあなご～", flag=flag)

# update anime.title or anime.introduction for edit function
@router.put("/edit/{anime_id}", response_model=anime_schema.AnimeResponse)
async def approve_anime_edit(anime_id: int, anime_body: anime_schema.AnimeBase):
    return anime_schema.AnimeResponse(anime_id=anime_id, **anime_body.model_dump(), kana="リコリス・リコイル", flag=1)

# update anime info excluding anime_id 
@router.put("/edit/admin/{anime_id}", response_model=anime_schema.AnimeResponse)
async def anime_edit_admin(anime_id: int, anime_body: anime_schema.AnimeCreate):
    return anime_schema.AnimeResponse(anime_id=anime_id, **anime_body.model_dump())

# delete anime info from DB
@router.delete("/{anime_id}")
async def delete_anime(anime_id: int):
    pass

# delete request anime from DB
@router.delete("/edit/{request_anime_id}")
async def delete_anime_request(request_anime_id: int):
    pass