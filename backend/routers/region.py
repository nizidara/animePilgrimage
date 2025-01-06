from fastapi import APIRouter, Depends, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.region as region_schema
import cruds.region as region_crud
import models.region as region_model
from database.db import engine, get_db

router = APIRouter(prefix="/regions", tags=["regions"])

region_model.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)

# get region name
@router.get("/detail/{region_id}", response_model=region_schema.RegionResponse)
@limiter.limit("500/minute")
async def region_name(request: Request, region_id: int, db: AsyncSession = Depends(get_db)):
    region = await region_crud.get_region_name(db=db, region_id=region_id)
    if region is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return region

# get region list
@router.get("/list", response_model=List[region_schema.RegionResponse])
@limiter.limit("500/minute")
async def region_list(request: Request, db: AsyncSession = Depends(get_db)):
    regions = await region_crud.get_region_list(db=db)
    if regions is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return regions