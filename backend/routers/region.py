from fastapi import APIRouter
from typing import List

import schemas.region as region_schema

router = APIRouter(prefix="/regions", tags=["regions"])

# get region name
@router.get("/{region_id}", response_model=region_schema.RegionResponse)
async def region_name(region_id: int):
    return region_schema.RegionResponse(region_id=region_id, region_name="東京都")

# get region list
@router.get("", response_model=List[region_schema.RegionResponse])
async def region_list():
    return [region_schema.RegionResponse(region_id=12, region_name="東京都")]