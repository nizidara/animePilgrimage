from typing import Optional
from datetime import datetime

from pydantic import BaseModel

class ContactBase(BaseModel):
    name: str
    email: str
    title: str
    contents: str

class ContactCreate(ContactBase):
    contact_date: datetime
    status: int
    user_id: Optional[str]

    class Config:
        orm_mode = True

class ContactResponse(ContactCreate):
    contact_id: int
    user_name: Optional[str] = "No Name"

    class Config:
        orm_mode = True