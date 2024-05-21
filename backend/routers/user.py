from fastapi import APIRouter
from typing import List

import schemas.user as user_schema

router = APIRouter(prefix="/users", tags=["users"])

# get user for login
@router.get("/login/", response_model=user_schema.UserLogin)
async def get_login_data(login_id: str):
    return user_schema.UserLogin(login_id=login_id, password="password")

# get user detail
@router.get("/{user_id}", response_model=user_schema.UserLoginResponse)
async def user_detail(user_id: str):
    return user_schema.UserLoginResponse(user_id=user_id, login_id="123", user_name="Nana", email=None, error_count=0, login_date="2024-04-12", flag=1, user_attribute_id=None)

# login
@router.post("", response_model=bool)
async def login(user_body: user_schema.UserLogin):
    return True