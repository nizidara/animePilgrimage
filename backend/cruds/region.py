from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple

import models.region as region_model

# read list
async def get_region_list(db:AsyncSession) -> List[Tuple[region_model.Region]]:
    return db.query(region_model.Region).all()

# read detail
async def get_region_name(db: AsyncSession, region_id: int) -> region_model.Region:
    return db.query(region_model.Region).filter(region_model.Region.region_id == region_id).first()

