from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.core.db_session import get_db
from backend.app.models.cutoff import Cutoff
from backend.app.services.eligibility import is_eligible

router = APIRouter(prefix="/eligibility", tags=["Eligibility"])

@router.get("/")
def check_eligibility(
    percentile: float,
    year: int,
    category: str,
    branch: str,
    db: Session = Depends(get_db),
):
    cutoffs = (
        db.query(Cutoff)
        .filter(
            Cutoff.year == year,
            Cutoff.category == category,
            Cutoff.branch == branch,
        )
        .all()
    )

    results = []
    for cutoff in cutoffs:
        results.append({
            "college_id": cutoff.college_id,
            "eligible": is_eligible(percentile, cutoff.percentile_cutoff),
            "cutoff": cutoff.percentile_cutoff
        })

    return results
