from fastapi import APIRouter, Depends, HTTPException, Response, Cookie, Request
from fastapi.security import OAuth2PasswordRequestForm
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from jose import JWTError

import schemas.user as user_schema
import cruds.user as user_crud
import models.user as user_model
import logic.auth as auth
from database.db import engine, get_db
from properties.properties import samesite

router = APIRouter(prefix="/users", tags=["users"])

user_model.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

#get user info in auth optional
@router.get("/auth/optional", response_model=user_schema.CurrentUserResponse)
async def get_current_user_optional(access_token: str = Cookie(None), db: AsyncSession = Depends(get_db)):
    if access_token is None:
        return None
    
    try:
        payload = await auth.decode_token(access_token)
        user_id: str = payload.get("id")
        
        if user_id is None:
            return None
        
        return await user_crud.auth_user(db=db, user_id=user_id)
        
    except JWTError:
        return None

#get user info in auth require
@router.get("/auth", response_model=user_schema.CurrentUserResponse)
async def get_current_user_required(access_token: str = Cookie(None), db: AsyncSession = Depends(get_db)):
    if access_token is None:
        raise HTTPException(status_code=401, detail="Access token not found")
    
    try:
        payload = await auth.decode_token(access_token)
        user_id: str = payload.get("id")
        
        if user_id is None:
            raise HTTPException(status_code=401, detail="Access refresh token")
        
        return await user_crud.auth_user(db=db, user_id=user_id)
        
    except JWTError:
        raise HTTPException(status_code=401, detail="Access refresh token")

# get user detail
#@router.get("/detail/{user_id}", response_model=user_schema.UserLoginResponse)
#async def user_detail(user_id: str, db: AsyncSession = Depends(get_db)):
#    user = await user_crud.get_user_detail(db=db, user_id=user_id)
#    if user is None:
#        raise HTTPException(status_code=404, detail="User not found")
#
#    return user
    
# get users
#@router.get("/list", response_model=List[user_schema.UserLoginResponse])
#async def user_detail(db: AsyncSession = Depends(get_db)):    
#    users = await user_crud.get_user_list(db=db)
#    if users is None:
#        raise HTTPException(status_code=404, detail="Users not found")
    # print(auth.hash_password("hogehoge")) # auth.pyのhash_password関数を呼び出し(async外す)
#
#    return users

# login
@router.post("/login", response_model=user_schema.LoginResponse)
@limiter.limit("5/minute")
async def login(request: Request, response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    login_body = user_schema.UserLogin(login_id=form_data.username, password=form_data.password)
    user = await user_crud.login_user(db=db, login_body=login_body)

    if user is None:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = await auth.create_access_token({"id":user.user_id})
    refresh_token = await auth.create_refresh_token({"id": user.user_id})
    
    # store access token in cookie
    response.set_cookie(
        key="access_token", 
        value=access_token,
        httponly=True,
        max_age=3600,
        secure=True,
        samesite=samesite
    )

    # store refresh token in cookie
    response.set_cookie(
        key="refresh_token", 
        value=refresh_token,
        httponly=True,
        max_age=2592000,  # 30 days
        secure=True,
        samesite=samesite
    )

    return {"message": "login successful"}

@router.post("/refresh")
async def refresh_token(response: Response, refresh_token: str = Cookie(None)):
    if refresh_token is None:
        raise HTTPException(status_code=401, detail="Refresh token not found")

    try:
        payload = await auth.decode_token(refresh_token)
        user_id = payload.get("id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        # new access token
        access_token = await auth.create_access_token({"id": user_id})

        # store new access token in cookie
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            max_age=3600,
            secure=True,
            samesite=samesite
        )

        return {"message": "Token refreshed"}
    
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
# logout
@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/", httponly=True, secure=True, samesite=samesite)
    response.delete_cookie("refresh_token", path="/", httponly=True, secure=True, samesite=samesite)
    return {"message": "Logged out successfully"}