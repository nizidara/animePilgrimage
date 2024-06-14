from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.contact as contact_model
import schemas.contact as contact_schema

"""
async def create_contact(
        db: AsyncSession, contact_create: contact_schema.sendContents
) -> contact_model.Testcontact:
    contact = contact_model.Testcontact(**contact_create.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)

    return contact

async def get_contact(db:AsyncSession) -> List[Tuple[contact_model.Testcontact]]:
    return db.query(contact_model.Testcontact).all()
"""

# create
async def create_contact(
        db: AsyncSession, contact_create: contact_schema.ContactCreate
) -> contact_schema.ContactResponse:
    # convert str -> UUID
    contact_dict = contact_create.model_dump()
    if contact_create.user_id is not None:
        contact_dict['user_id'] = uuid.UUID(contact_create.user_id).bytes
    contact = contact_model.Contact(**contact_dict)

    # create
    db.add(contact)
    db.commit()
    db.refresh(contact)

    # convert UUID -> str
    response = None
    if contact:
        response_dict = contact.__dict__
        if contact.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=contact.user_id))
        response = contact_schema.ContactResponse(**response_dict)

    return response

# read list
async def get_contact_list(db:AsyncSession) -> List[Tuple[contact_schema.ContactResponse]]:
    # get
    contacts = db.query(contact_model.Contact).all()
    
    # convert UUID -> str
    response_list = []
    if contacts:
        for contact in contacts:
            response_dict = contact.__dict__
            if contact.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=contact.user_id))
            response_list.append(contact_schema.ContactResponse(**response_dict))

    return response_list

# read detail
async def get_contact_detail(db: AsyncSession, contact_id: int) -> contact_schema.ContactResponse:
    # get
    contact = db.query(contact_model.Contact).filter(contact_model.Contact.contact_id == contact_id).first()

    # convert UUID -> str
    response = None
    if contact:
        response_dict = contact.__dict__
        if contact.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=contact.user_id))
        response = contact_schema.ContactResponse(**response_dict)

    return response

# update status
async def update_contact_status(db: AsyncSession, contact_id: int, status: int) -> contact_schema.ContactResponse:
    contact = db.query(contact_model.Contact).filter(contact_model.Contact.contact_id == contact_id).first()
    response = None
    if contact:
        contact.status = status
        db.commit()
        db.refresh(contact)

        # convert UUID -> str
        response_dict = contact.__dict__
        if contact.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=contact.user_id))
        response = contact_schema.ContactResponse(**response_dict)

    return response

# delete contact
async def delete_contact(db: AsyncSession, contact_id: int) -> contact_model.Contact:
    contact = db.query(contact_model.Contact).filter(contact_model.Contact.contact_id == contact_id).first()
    if contact:
        db.delete(contact)
        db.commit()
    return contact