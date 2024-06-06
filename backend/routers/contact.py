from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.contact as contact_crud
import schemas.contact as contact_schema
import models.contact as contact_model
from database.db import engine, get_db

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

## get contact detail
@router.get("/detail/{contact_id}", response_model=contact_schema.ContactResponse)
async def contact_detail(contact_id: int, db: AsyncSession = Depends(get_db)):
    contact = await contact_crud.get_contact_detail(db, contact_id=contact_id) 
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

# get contact list
@router.get("/list", response_model=List[contact_schema.ContactResponse])
async def get_contact(db: AsyncSession = Depends(get_db)):
    return await contact_crud.get_contact_list(db)

# send contact
@router.post("", response_model=contact_schema.ContactResponse)
async def send_contact(contents_body: contact_schema.ContactCreate, db: AsyncSession = Depends(get_db)):
    return await contact_crud.create_contact(db, contents_body)

## check contact and update status
@router.put("/{contact_id}", response_model=contact_schema.ContactResponse)
async def check_contact(contact_id: int, status: int, db: AsyncSession = Depends(get_db)):
    contact = await contact_crud.update_contact_status(db, contact_id=contact_id, status=status)
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

## delete contact
@router.delete("/{contact_id}")
async def delete_contact(contact_id: int, db: AsyncSession = Depends(get_db)):
    contact = await contact_crud.delete_contact(db, contact_id)
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}
