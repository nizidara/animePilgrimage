from fastapi import APIRouter

router = APIRouter()


@router.get("/place")
async def list_place():
    pass


@router.post("/place")
async def create_place():
    pass


@router.put("/place/{place_id}")
async def update_place():
    pass


@router.delete("/place/{place_id}")
async def delete_place():
    pass