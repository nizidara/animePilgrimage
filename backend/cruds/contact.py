from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple

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

async def create_contact(
        db: AsyncSession, contact_create: contact_schema.ContactCreate
) -> contact_model.Contact:
    contact = contact_model.Contact(**contact_create.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)

    return contact

async def get_contact(db:AsyncSession) -> List[Tuple[contact_model.Contact]]:
    return db.query(contact_model.Contact).all()