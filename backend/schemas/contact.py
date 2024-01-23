from pydantic import BaseModel

class sendContents(BaseModel):
    name: str
    email: str
    title: str
    contents: str

class responseContents(sendContents):
    id: int

    class Config:
        orm_mode = True