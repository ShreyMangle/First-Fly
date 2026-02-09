from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.db_session import get_db
from backend.app.models.cutoff import Cutoff

router = APIRouter(prefix="/branches", tags=["Branches"])

@router.get("/")
def list_branches(db: Session = Depends(get_db)):
    rows = (
        db.query(Cutoff.branch_code, Cutoff.branch_name)
        .distinct()
        .all()
    )
    return [{"branch_code": r[0], "branch_name": r[1]} for r in rows]
