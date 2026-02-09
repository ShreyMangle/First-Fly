from fastapi import FastAPI
from backend.app.core.database import Base, engine
from backend.app.api.college import router as college_router
from backend.app.api.cutoff import router as cutoff_router
from backend.app.api.recommendations import router as recommendations_router

from fastapi.middleware.cors import CORSMiddleware 

app=FastAPI(
    title="First Fly",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/health')
def health_check():
    return{
        'status':'OK',
        'version':app.version
    }

Base.metadata.create_all(bind=engine)
app.include_router(college_router)

app.include_router(cutoff_router)

app.include_router(recommendations_router)

