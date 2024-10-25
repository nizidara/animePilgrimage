from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException
from typing import List, Tuple
import uuid

import models.user as user_model
import schemas.user as user_schema
import logic.auth as auth

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

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

# auth function
async def auth_user(db: AsyncSession, user_id:str) -> user_schema.CurrentUserResponse:
    # convert str -> UUID
    user_id_bytes = uuid.UUID(user_id).bytes

    # get
    user = db.query(user_model.User).filter(user_model.User.user_id == user_id_bytes).first()

    response = None
    if user is not None:
        response = user_schema.CurrentUserResponse(user_id=str(uuid.UUID(bytes=user.user_id)), user_name=user.user_name, user_attribute_name=user.user_attribute.user_attribute_name if user.user_attribute else None)

    return response

# login function
async def login_user(db: AsyncSession, login_body:user_schema.UserLogin) -> user_schema.UserIdResponse:
    # get
    user = db.query(user_model.User).filter(user_model.User.login_id == login_body.login_id).first()

    response = None
    if user is not None:
        # check password
        if not await auth.verify_password(login_body.password, user.password):
            raise HTTPException(status_code=400, detail="Invalid credentials")
        
        response = user_schema.UserIdResponse(user_id=str(uuid.UUID(bytes=user.user_id)))

    return response
