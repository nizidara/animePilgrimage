from typing import Optional
from datetime import datetime

from pydantic import BaseModel, EmailStr

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    title: str
    contents: str

class ContactCreate(ContactBase):
    contact_date: datetime
    status: int
    user_id: Optional[str] = None

    class Config:
        from_attributes = True

class ContactResponse(ContactCreate):
    contact_id: int
    user_name: Optional[str] = "No Name"

    class Config:
        from_attributes = True