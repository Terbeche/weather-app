from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, Float, ForeignKey, Integer, String

Base = declarative_base()

class DashboardLocation(Base):
    __tablename__ = "dashboard_locations"

    id = Column(Integer, primary_key=True, index=True)
    location_id = Column(Integer, ForeignKey('locations.id'))

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    country = Column(String, index=True)
