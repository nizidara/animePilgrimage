from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession

import cruds.contact as contact_crud
import schemas.contact as contact_schema
import models.contact as contact_model
import routers.user as user_router
import schemas.user as user_schema
import logic.mail as mail
from database.db import engine, get_db

router = APIRouter(prefix="/contacts", tags=["contacts"])

contact_model.Base.metadata.create_all(bind=engine)

## get contact detail
@router.get("/detail/{contact_id}", response_model=contact_schema.ContactResponse)
async def contact_detail(contact_id: int, db: AsyncSession = Depends(get_db)):
    contact = await contact_crud.get_contact_detail(db, contact_id=contact_id) 
    if contact is None:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

# get contact list
@router.get("/list", response_model=List[contact_schema.ContactResponse])
async def get_contact(current_user: user_schema.CurrentUserResponse = Depends(user_router.get_current_user), db: AsyncSession = Depends(get_db)):
    if current_user.user_attribute_name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="管理者権限が必要です")
    return await contact_crud.get_contact_list(db)

# send contact
@router.post("", response_model=contact_schema.ContactResponse)
async def send_contact(contents_body: contact_schema.ContactCreate, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    # send mail
    background_tasks.add_task(mail.send_email, contents_body)

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
