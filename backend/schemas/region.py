from pydantic import BaseModel

class RegionBase(BaseModel):
    region_name: str

class RegionResponse(RegionBase):
    region_id: int

    class Config:
        orm_mode = True