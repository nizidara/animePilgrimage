from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
from datetime import datetime, timezone
import uuid

import models.contact as contact_model
import models.user as user_model
import schemas.contact as contact_schema
import logic.input as input_logic

# create
async def create_contact(
        db: AsyncSession, contact_create: contact_schema.ContactCreate
) -> contact_schema.ContactResponse:
    
    # convert str -> UUID
    contact_dict = contact_create.model_dump()
    user_name = None
    if contact_create.user_id is not None:
        contact_dict['user_id'] = uuid.UUID(contact_create.user_id).bytes
        user = db.query(user_model.User).filter(user_model.User.user_id == contact_dict['user_id']).first()
        user_name = user.user_name
    contact_dict['contents'] = input_logic.normalize_break(contact_create.contents)
    
    current_time = datetime.now(tz=timezone.utc)

    contact = contact_model.Contact(**contact_dict, contact_date=current_time)

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
        response = contact_schema.ContactResponse(**response_dict, user_name=user_name)

    return response

# read list
async def get_contact_list(db:AsyncSession) -> List[Tuple[contact_schema.ContactResponse]]:
    # get
    results = db.query(contact_model.Contact, user_model.User.user_name).\
        outerjoin(user_model.User, contact_model.Contact.user_id == user_model.User.user_id).\
        order_by(contact_model.Contact.contact_date.desc()).all()
    
    # convert UUID -> str
    response_list = []
    if results:
        for contact, user_name in results:
            response_dict = contact.__dict__
            if contact.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=contact.user_id))
            response_list.append(contact_schema.ContactResponse(**response_dict, user_name=user_name))

    return response_list

# read detail
async def get_contact_detail(db: AsyncSession, contact_id: int) -> contact_schema.ContactResponse:
    # get
    result = db.query(contact_model.Contact, user_model.User.user_name).outerjoin(user_model.User, contact_model.Contact.user_id == user_model.User.user_id).filter(contact_model.Contact.contact_id == contact_id).first()

    # convert UUID -> str
    response = None
    if result:
        contact, user_name = result
        response_dict = contact.__dict__
        if contact.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=contact.user_id))
        response = contact_schema.ContactResponse(**response_dict, user_name=user_name)

    return response

# update status
async def update_contact_status(db: AsyncSession, contact_id: int, status: int) -> contact_schema.ContactResponse:
    # get
    result = db.query(contact_model.Contact, user_model.User.user_name).outerjoin(user_model.User, contact_model.Contact.user_id == user_model.User.user_id).filter(contact_model.Contact.contact_id == contact_id).first()
    
    response = None
    if result:
        contact, user_name = result
        contact.status = status
        db.commit()
        db.refresh(contact)

        # convert UUID -> str
        response_dict = contact.__dict__
        if contact.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=contact.user_id))
        response = contact_schema.ContactResponse(**response_dict, user_name=user_name)

    return response

# delete contact
async def delete_contact(db: AsyncSession, contact_id: int) -> contact_model.Contact:
    contact = db.query(contact_model.Contact).filter(contact_model.Contact.contact_id == contact_id).first()
    if contact:
        db.delete(contact)
        db.commit()
    return contact