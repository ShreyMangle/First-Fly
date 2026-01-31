from fastapi import FastAPI
from backend.app.core.database import Base, engine
from backend.app.api.college import router as college_router

app=FastAPI(
    title="First Fly",
    version="0.1.0",
)

Base.metadata.create_all(bind=engine)
app.include_router(college_router)