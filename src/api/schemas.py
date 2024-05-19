from pydantic import BaseModel

class LocationBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    country: str

class LocationCreate(LocationBase):
    pass

class LocationModel(LocationBase):
    id: int

    class Config:
        from_attributes = True

class LocationId(BaseModel):
    id: int

class DashboardLocationModel(BaseModel):
    id: int
    location_id: int

    class Config:
        from_attributes = True
