from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

import schemas.user as user_schema
import cruds.user as user_crud
import models.user as user_model
from database.db import engine, get_db

router = APIRouter(prefix="/users", tags=["users"])

user_model.Base.metadata.create_all(bind=engine)

# get user for login
@router.get("/login", response_model=user_schema.UserLogin)
async def get_login_data(login_id: str):
    return user_schema.UserLogin(login_id=login_id, password="password")

# get user detail
@router.get("/detail/{user_id}", response_model=user_schema.UserLoginResponse)
async def user_detail(user_id: str, db: AsyncSession = Depends(get_db)):
    user = await user_crud.get_user_detail(db=db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Contact not found")

    return user
    
# get users
@router.get("/list", response_model=List[user_schema.UserLoginResponse])
async def user_detail(db: AsyncSession = Depends(get_db)):
    users = await user_crud.get_user_list(db=db)
    if users is None:
        raise HTTPException(status_code=404, detail="Contact not found")

    return users

# login
@router.post("", response_model=bool)
async def login(user_body: user_schema.UserLogin):
    return True