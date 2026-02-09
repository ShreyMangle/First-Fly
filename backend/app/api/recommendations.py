from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.core.db_session import get_db
from backend.app.services.recommendation_service import get_recommendations

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])


@router.get("/")
def recommend(
    percentile: float,
    category: str,
    branch_code: str,
    year: int,
    top_n: int = 10,
    min_status: str | None = None,
    db: Session = Depends(get_db),
):
    results = get_recommendations(
        db=db,
        percentile=percentile,
        category=category,
        branch_code=branch_code,
        year=year,
        min_status=min_status,
    )
    
    return results[:top_n]
