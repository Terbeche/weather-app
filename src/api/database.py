from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

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
