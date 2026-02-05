from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.core.db_session import get_db
from backend.app.services.recommendation_service import get_recommendations

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])


@router.get("/")
def recommend(
    percentile: float,
    category: str,
    branch: str,
    year: int,
    db: Session = Depends(get_db),
):
    return get_recommendations(
        db=db,
        percentile=percentile,
        category=category,
        branch=branch,
        year=year,
    )
