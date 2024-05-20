from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.contact as contact_crud
import schemas.contact as contact_schema
import models.contact as contact_model
from database.db import engine, get_db

router = APIRouter(tags=["Contacts"])

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

## get contact detail
@router.get("/contact/", response_model=contact_schema.ContactResponse)
async def detail_contact(contact_id: int):
    return contact_schema.ContactResponse(contact_id=contact_id, contanct_date="2024-04-19 12:34:56", name="Takina", email="contact@nizidara.com", title="sakana-", contents="hoge", status=0, user_id=None)

## check contact and update status
@router.put("/contact/{contact_id}", response_model=contact_schema.ContactResponse)
async def check_contact(contact_id: int, contact_body: contact_schema.ContactCreate):
    return contact_schema.ContactResponse(contact_id=contact_id, **contact_body.model_dump())

## check contact and update status
@router.delete("/contact/{contact_id}")
async def delete_contact():
    pass
