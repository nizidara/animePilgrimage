from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.user as user_model

# read list
async def get_user_list(db:AsyncSession) -> List[Tuple[user_model.User]]:
    return db.query(user_model.User).all()

# read detail
async def get_user_detail(db: AsyncSession, user_id: str) -> user_model.User:
    user_id_bytes = uuid.UUID(user_id).bytes
    return db.query(user_model.User).filter(user_model.User.user_id == user_id_bytes).first()

