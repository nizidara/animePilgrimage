from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.contact as contact_crud
import schemas.contact as contact_schema
import models.contact as contact_model
from database.db import engine, get_db

from datetime import datetime

router = APIRouter(prefix="/contacts", tags=["contacts"])

contact_model.Base.metadata.create_all(bind=engine)

"""
#送信
@router.post("", response_model=contact_schema.responseContents)
async def send_contact(contents_body: contact_schema.sendContents, db: AsyncSession = Depends(get_db)):
    return await contact_crud.create_contact(db, contents_body)

#一覧取得
@router.get("", response_model=List[contact_schema.responseContents])
async def get_contact(db: AsyncSession = Depends(get_db)):
    results = await contact_crud.get_contact(db)
    return results
"""

#送信
@router.post("", response_model=contact_schema.ContactResponse)
async def send_contact(contents_body: contact_schema.ContactCreate, db: AsyncSession = Depends(get_db)):
    return await contact_crud.create_contact(db, contents_body)

#一覧取得
@router.get("", response_model=List[contact_schema.ContactResponse])
async def get_contact(db: AsyncSession = Depends(get_db)):
    return await contact_crud.get_contact(db)

## get contact detail
@router.get("/{contact_id}", response_model=contact_schema.ContactResponse)
async def contact_detail(contact_id: int):
    return contact_schema.ContactResponse(contact_id=contact_id, contanct_date="2024-04-19 12:34:56", name="Takina", email="contact@nizidara.com", title="sakana-", contents="hoge", status=0, user_id=None)

## check contact and update status
@router.put("/{contact_id}", response_model=contact_schema.ContactResponse)
async def check_contact(contact_id: int, status: int):
    return contact_schema.ContactResponse(contact_id=contact_id, contanct_date="2024-04-19 12:34:56", name="Kumiko", email="contact@nizidara.com", title="umaku naritai", contents="Gold", status=status, user_id=None)

## check contact and update status
@router.delete("/{contact_id}")
async def delete_contact(contact_id: int):
    pass
