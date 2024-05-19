from pydantic import BaseModel
from datetime import date

from typing import Optional

class UserBase(BaseModel):
    login_id: str

class UserLogin(UserBase):
    password: str

    class Config:
        orm_mode = True

class UserLoginResponse(UserBase):
    user_id: str
    user_name: str
    email: Optional[str]
    error_count: int
    login_date:date
    flag: Optional[int]
    user_attribute_id: Optional[int]