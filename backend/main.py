from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.core.config import get_settings
from backend.app.core.database import Base, engine
from backend.app.api.college import router as college_router
from backend.app.api.cutoff import router as cutoff_router
from backend.app.api.recommendations import router as recommendations_router
from backend.app.api.branches import router as branches_router
from backend.app.api.auth import router as auth_router

settings = get_settings()

API_PREFIX = "/api/v1"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Run startup tasks (DB init) and shutdown cleanup."""
    Base.metadata.create_all(bind=engine)
    yield
    # Future: add connection pool cleanup here


app = FastAPI(
    title=settings.APP_TITLE,
    version=settings.APP_VERSION,
    description=settings.APP_DESCRIPTION,
    contact={
        "name": "First Fly Team",
        "email": "contact@firstfly.in",
    },
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)

# ── Health check (no auth, no prefix) ──────────────────────────────────────

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "OK",
        "version": app.version,
        "env": settings.APP_ENV,
    }


# ── Versioned routers ──────────────────────────────────────────────────────

app.include_router(auth_router,            prefix=API_PREFIX)
app.include_router(college_router,         prefix=API_PREFIX)
app.include_router(cutoff_router,          prefix=API_PREFIX)
app.include_router(recommendations_router, prefix=API_PREFIX)
app.include_router(branches_router,        prefix=API_PREFIX)
