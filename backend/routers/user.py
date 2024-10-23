from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.user as user_schema
import cruds.user as user_crud
import models.user as user_model
import logic.auth as auth
from database.db import engine, get_db
from properties.properties import secret_key, algorithm, access_token_expire_minutes

router = APIRouter(prefix="/users", tags=["users"])


user_model.Base.metadata.create_all(bind=engine)

# #get user in auth
@router.get("/auth", response_model=user_schema.CurrentUserResponse)
async def get_current_user(current_user: user_schema.CurrentUserResponse = Depends(user_crud.get_current_user)):

    # ユーザーをDBから取得
    # user = await user_crud.get_current_user(db=db, user_id=user_id)
    return current_user

# get user detail
@router.get("/detail/{user_id}", response_model=user_schema.UserLoginResponse)
async def user_detail(user_id: str, db: AsyncSession = Depends(get_db)):
    user = await user_crud.get_user_detail(db=db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return user
    
# get users
@router.get("/list", response_model=List[user_schema.UserLoginResponse])
async def user_detail(db: AsyncSession = Depends(get_db)):
    users = await user_crud.get_user_list(db=db)
    if users is None:
        raise HTTPException(status_code=404, detail="Users not found")

    return users

# login
@router.post("/login", response_model=user_schema.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    login_body = user_schema.UserLogin(login_id=form_data.username, password=form_data.password)
    user = await user_crud.login_user(db=db, login_body=login_body)

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    access_token = await auth.create_access_token({"id":user.user_id, "name":user.user_name, "attribute":user.user_attribute_name})

    return {"access_token": access_token, "token_type": "bearer", "user_id": user.user_id}