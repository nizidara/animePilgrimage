from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.user as user_model
import schemas.user as user_schema

# read list
async def get_user_list(db:AsyncSession) -> List[Tuple[user_model.User]]:
    # get
    users = db.query(user_model.User).all()
    
    # convert UUID -> str
    response_list = []
    for user in users:
        response_dict = user.__dict__
        response_dict['user_id'] = str(uuid.UUID(bytes=user.user_id))
        response_list.append(user_schema.UserLoginResponse(**response_dict))
        
    return response_list

# read detail
async def get_user_detail(db: AsyncSession, user_id: str) -> user_model.User:
    # convert str -> UUID
    user_id_bytes = uuid.UUID(user_id).bytes

    # get
    user = db.query(user_model.User).filter(user_model.User.user_id == user_id_bytes).first()

    # convert UUID -> str
    if user is not None:
        response_dict = user.__dict__
        user.user_id = str(uuid.UUID(bytes=user.user_id))
        response = user_schema.UserLoginResponse(**response_dict)
        
    return response

