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
    email: Optional[str] = ""
    error_count: int
    login_date:date
    flag: Optional[int] = 0
    user_attribute_id: Optional[int] = 0
    user_attribute_name: Optional[str] = "not user"

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: str

    class Config:
        orm_mode = True

class CurrentUserResponse(BaseModel):
    user_id: str
    user_name: str
    user_attribute_name: str

    class Config:
        orm_mode = True