from pydantic import BaseModel

class sendAnime(BaseModel):
    title: str
    kana: str
    introduction: str
    flag: int
    

class responseAnime(sendAnime):
    anime_id: int

    class Config:
        orm_mode = True