from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.contact as contact_crud
import schemas.contact as contact_schema
import models.contact as contact_model
from database.db import engine, get_db

router = APIRouter()

contact_model.Base.metadata.create_all(bind=engine)

#送信
@router.post("/contact", response_model=contact_schema.responseContents)
async def send_contact(contents_body: contact_schema.sendContents, db: AsyncSession = Depends(get_db)):
    return await contact_crud.create_contact(db, contents_body)

#一覧取得
@router.get("/contact", response_model=List[contact_schema.responseContents])
async def get_contact(db: AsyncSession = Depends(get_db)):
    results = await contact_crud.get_contact(db)
    return results
