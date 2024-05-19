from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import DashboardLocation, Location
from schemas import DashboardLocationModel, LocationId
from utils import get_weather_data, get_forecast_data

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/dashboard_locations")
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

@router.get("/dashboard_locations/{id}")
def get_location(id: int, db: Session = Depends(get_db)):
    dashboard_location = db.query(DashboardLocation).get(id)
    if dashboard_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
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
    return location_data

@router.get("/forecast/{location_id}")
def get_forecast(location_id: int, db: Session = Depends(get_db)):
    location = db.query(Location).get(location_id)
    if location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    weather_data = get_forecast_data(location.latitude, location.longitude)
    location.time = weather_data['daily']['time']
    location.temperature_min = weather_data['daily']['temperature_2m_min']
    location.temperature_max = weather_data['daily']['temperature_2m_max']
    location.rain_sum = weather_data['daily']['rain_sum']
    location.weather_code = weather_data['daily']['weather_code']

    return location

@router.post("/dashboard_locations", response_model=DashboardLocationModel)
def create_location(location: LocationId, db: Session = Depends(get_db)):
    db_location = DashboardLocation(location_id=location.id)
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location

@router.delete("/dashboard_locations/{id}")
def delete_location(id: int, db: Session = Depends(get_db)):
    dashboard_location = db.query(DashboardLocation).get(id)
    if dashboard_location is None:
        raise HTTPException(status_code=404, detail="Location not found")
    db.delete(dashboard_location)
    db.commit()
    return {"message": "Location deleted successfully"}
