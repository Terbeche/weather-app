import csv
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.orm import Session
from sqlalchemy import Column, Float, Integer, String, create_engine


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

class Location(Base):
    __tablename__ = "locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)

def add_locations_to_db():
    db = SessionLocal()
    with open('locations.csv', 'r') as file:
        reader = csv.DictReader(file, delimiter=',')
        for row in reader:
            location = Location(
                name=row['Capital City'],
                latitude=float(row['Latitude']),
                longitude=float(row['Longitude'])
            )
            db.add(location)
        db.commit()

add_locations_to_db()
