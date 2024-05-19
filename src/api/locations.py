from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Location
from schemas import LocationModel
from utils import get_weather_data, get_forecast_data

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/all_locations")
def get_all_locations(db: Session = Depends(get_db)):
    locations = db.query(Location).all()
    return locations
