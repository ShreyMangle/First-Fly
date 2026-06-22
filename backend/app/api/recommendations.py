from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from backend.app.core.db_session import get_db
from backend.app.api.auth import get_current_user, require_role
from backend.app.models.cutoff import Cutoff
from backend.app.services.recommendation_service import get_recommendations
from backend.app.schemas.recommendation import RecommendationResponse

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])


@router.get("/", response_model=list[RecommendationResponse])
def recommend(
    percentile: Annotated[float, Query(ge=0.0, le=100.0, description="Your MHT-CET percentile (0–100)")],
    category: Annotated[str, Query(description="Reservation category (OPEN, SC, ST, OBC, EWS, TFWS)")],
    branch_code: Annotated[str, Query(description="Engineering branch code")],
    year: Annotated[int, Query(ge=2018, le=2030, description="CAP year")],
    top_n: Annotated[int, Query(ge=1, le=50, description="Max number of results")] = 10,
    min_status: Annotated[str | None, Query(description="Minimum admission status (SAFE, MODERATE, DREAM)")] = None,
    db: Session = Depends(get_db),
    user: dict = Depends(get_current_user),
):
    if min_status and min_status not in ("SAFE", "MODERATE", "DREAM"):
        from fastapi import HTTPException
        raise HTTPException(status_code=422, detail="min_status must be one of: SAFE, MODERATE, DREAM")

    results = get_recommendations(
        db=db,
        percentile=percentile,
        category=category.upper(),
        branch_code=branch_code.upper(),
        year=year,
        min_status=min_status,
    )
    return results[:top_n]