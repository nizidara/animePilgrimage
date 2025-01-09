from pydantic import BaseModel
from datetime import date

from typing import Optional

class UserBase(BaseModel):
    login_id: str

class UserLogin(UserBase):
    password: str

    class Config:
        from_attributes = True

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
        from_attributes = True

class LoginResponse(BaseModel):
    message: str

    class Config:
        from_attributes = True

class UserIdResponse(BaseModel):
    user_id: str

    class Config:
        from_attributes = True

class CurrentUserResponse(UserIdResponse):
    user_name: str
    user_attribute_name: Optional[str] = "not user"

    class Config:
        from_attributes = True