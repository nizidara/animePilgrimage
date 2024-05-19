from typing import Optional
from datetime import datetime

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

class ContactBase(BaseModel):
    name: str
    email: str
    title: str
    contents: str

class ContactCreate(ContactBase):
    contanct_date: datetime
    status: int
    user_id: Optional[str]

    class Config:
        orm_mode = True

class ContactResponse(ContactCreate):
    contact_id: int