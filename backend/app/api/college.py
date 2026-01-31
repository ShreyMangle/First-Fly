from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.core.db_session import get_db
from backend.app.models.college import College
from backend.app.schemas.college import CollegeOut

router = APIRouter(prefix="/colleges", tags=["Colleges"])

@router.get("/", response_model=list[CollegeOut])
def list_colleges(db: Session = Depends(get_db)):
    return db.query(College).all()
