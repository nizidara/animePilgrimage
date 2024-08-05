from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple

import models.region as region_model
import schemas.region as region_schema

# read list
async def get_region_list(db:AsyncSession) -> List[Tuple[region_schema.RegionResponse]]:
    return db.query(region_model.Region).order_by(region_model.Region.region_id).all()

# read detail
async def get_region_name(db: AsyncSession, region_id: int) -> region_schema.RegionResponse:
    return db.query(region_model.Region).filter(region_model.Region.region_id == region_id).first()

