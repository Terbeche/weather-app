from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session, declarative_base, sessionmaker
from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel
import httpx

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = create_engine(
    "postgresql://",
    connect_args={
        "user": "postgres",
        "password": "0000",
        "host": "localhost",
        "port": 5432,
        "database": "weather"
    }
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class DashboardLocation(Base):
    __tablename__ = "dashboard_locations"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey('locations.id'))

class DashboardLocationModel(BaseModel):
    id: int
    location_id: int

    class Config:
        orm_mode = True

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)

Base.metadata.create_all(bind=engine)

class LocationBase(BaseModel):
    name: str
    latitude: float
    longitude: float

class LocationCreate(LocationBase):
    pass

class LocationModel(LocationBase):
    id: int

    class Config:
        from_attributes = True

class LocationId(BaseModel):
    id: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/dashboard_locations")
def get_locations(db: Session = Depends(get_db)):
    dashboard_locations = db.query(DashboardLocation).all()
    locations = []
    for dashboard_location in dashboard_locations:
        location = db.query(Location).get(dashboard_location.location_id)
        weather_data = get_weather_data(location.latitude, location.longitude)
        location_data = {
            "id": dashboard_location.id,
            "location_id": location.id,
            "name": location.name,
            "latitude": location.latitude,
            "longitude": location.longitude,
            "temperature": weather_data['current']['temperature'],
            "rainfall": weather_data['current']['rain'],
            "weather_code": weather_data['current']['weathercode']
        }
        locations.append(location_data)
    return locations

def get_weather_data(latitude: float, longitude: float):
    response = httpx.get(f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current=temperature,rain,weathercode")
    return response.json()

@app.get("/all_locations")
def get_all_locations(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    return locations
