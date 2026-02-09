from sqlalchemy.orm import Session
from backend.app.models.cutoff import Cutoff


def get_recommendations(
    db: Session,
    percentile: float,
    category: str,
    branch_code: str,
    year: int,
    min_status: str | None = None,
):
    results = []

    cutoffs = (
        db.query(Cutoff)
        .filter(
            Cutoff.category == category,
            Cutoff.branch_code == branch_code,
            Cutoff.year == year,
        )
        .all()
    )

    for c in cutoffs:
        cutoff = c.percentile_cutoff

        if percentile >= cutoff + 1:
            status = "SAFE"
        elif cutoff - 0.5 <= percentile < cutoff + 1:
            status = "MODERATE"
        else:
            status = "DREAM"

        if min_status and status not in ("SAFE", "MODERATE", "DREAM"):
            continue

        results.append({
            "college_id": c.college_id,
            "branch_code": c.branch_code,
            "branch_name": c.branch_name,
            "category": c.category,
            "year": c.year,
            "round": c.round,
            "cutoff": cutoff,
            "status": status,
        })

    return results
