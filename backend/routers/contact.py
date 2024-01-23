from fastapi import APIRouter

import schemas.contact as contact_schema

router = APIRouter()

@router.post("/contact", response_model=contact_schema.responseContents)
async def send_contact(contents_body: contact_schema.sendContents):
    return contact_schema.responseContents(id=2, **contents_body.dict())