from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.user as user_model

# read list
async def get_user_list(db:AsyncSession) -> List[Tuple[user_model.User]]:
    # get
    users = db.query(user_model.User).all()
    
    # convert UUID -> str
    for user in users:
        user.user_id = str(uuid.UUID(bytes=user.user_id))
        
    return users

# read detail
async def get_user_detail(db: AsyncSession, user_id: str) -> user_model.User:
    # convert str -> UUID
    user_id_bytes = uuid.UUID(user_id).bytes

    # get
    user = db.query(user_model.User).filter(user_model.User.user_id == user_id_bytes).first()

    # convert UUID -> str
    if user is not None:
        user.user_id = str(uuid.UUID(bytes=user.user_id))

    return user

