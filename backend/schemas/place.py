from typing import Optional

from pydantic import BaseModel

class sendPlace(BaseModel):
    name: str
    latitude: float
    longitude: float
    comment: str
    flag: int
    region_id: int
    anime_id: int
    created_user_id: Optional[int]
    edited_user_id: Optional[int]


class responseAnime(sendPlace):
    place_id: str

    class Config:
        orm_mode = True