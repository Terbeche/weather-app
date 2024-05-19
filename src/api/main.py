from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import locations, dashboard_locations
from location import add_locations_to_db 
from database import engine, SessionLocal
from models import Base
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

origins = os.getenv('ALLOWED_ORIGINS').split(',')

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(locations.router)
app.include_router(dashboard_locations.router)

Base.metadata.create_all(bind=engine)
add_locations_to_db()
