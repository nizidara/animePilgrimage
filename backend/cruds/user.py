from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from typing import List, Tuple
import uuid
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone

import models.user as user_model
import schemas.user as user_schema

from properties.properties import secret_key, algorithm, access_token_expire_minutes

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> user_schema.CurrentUserResponse:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        user_id: str = payload.get("id")
        name: str = payload.get("name")
        attribute: str = payload.get("attribute")
        if user_id is None:
            raise credentials_exception
        print(payload)
        return user_schema.CurrentUserResponse(user_id=user_id, user_name=name, user_attribute_name=attribute)
        
    except JWTError:
        raise credentials_exception

# read list
async def get_user_list(db:AsyncSession) -> List[Tuple[user_schema.UserLoginResponse]]:
    # get
    users = db.query(user_model.User).all()
    
    # convert UUID -> str
    response_list = []
    for user in users:
        response_dict = user.__dict__
        response_dict['user_id'] = str(uuid.UUID(bytes=user.user_id))
        response_list.append(user_schema.UserLoginResponse(**response_dict, user_attribute_name=user.user_attribute.user_attribute_name if user.user_attribute else None))
        
    return response_list

# read detail
async def get_user_detail(db: AsyncSession, user_id: str) -> user_schema.UserLoginResponse:
    # convert str -> UUID
    user_id_bytes = uuid.UUID(user_id).bytes

    # get
    user = db.query(user_model.User).filter(user_model.User.user_id == user_id_bytes).first()
    
    # convert UUID -> str
    response = None
    if user is not None:
        response_dict = user.__dict__
        user.user_id = str(uuid.UUID(bytes=user.user_id))
        response = user_schema.UserLoginResponse(**response_dict, user_attribute_name=user.user_attribute.user_attribute_name if user.user_attribute else None)
        
    return response

# login function
async def login_user(db: AsyncSession, login_body:user_schema.UserLogin) -> user_schema.UserLoginResponse:
    
    # get
    user = db.query(user_model.User).filter(user_model.User.login_id == login_body.login_id).first()

    response = None
    if user is not None:
        response_dict = user.__dict__
        user.user_id = str(uuid.UUID(bytes=user.user_id))
        response = user_schema.UserLoginResponse(**response_dict, user_attribute_name=user.user_attribute.user_attribute_name if user.user_attribute else None)

    return response

# create access token
async def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=int(access_token_expire_minutes)))
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)

    return encoded_jwt