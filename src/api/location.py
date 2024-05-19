import csv
import os
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.orm import Session
from sqlalchemy import Column, Float, Integer, String, create_engine
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(
    f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    country = Column(String)

def add_locations_to_db():
    db = SessionLocal()
    with open('locations.csv', 'r') as file:
        reader = csv.DictReader(file, delimiter=',')
        for row in reader:
            location = Location(
                name=row['Capital City'],
                latitude=float(row['Latitude']),
                longitude=float(row['Longitude']),
                country=row['Country']
            )
            db.add(location)
        db.commit()
