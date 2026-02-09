from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.core.db_session import get_db
from backend.app.models.cutoff import Cutoff
from backend.app.schemas.cutoff import CutoffOut

router = APIRouter(prefix="/cutoffs", tags=["Cutoffs"])

@router.get("/", response_model=list[CutoffOut])
def list_cutoffs(
    year: int,
    category: str,
    branch_code: str,
    db: Session = Depends(get_db),
):
    return (
        db.query(Cutoff)
        .filter(
            Cutoff.year == year,
            Cutoff.category == category,
            Cutoff.branch_code == branch_code,
        )
        .all()
    )
