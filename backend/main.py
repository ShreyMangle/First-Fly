from fastapi import FastAPI
from backend.app.core.database import Base, engine

app=FastAPI(
    title="First Fly",
    version="0.1.0",
)

Base.metadata.create_all(bind=engine)