from sqlalchemy.orm import Session
from backend.app.models.cutoff import Cutoff
from backend.app.models.college import College

STATUS_RANK = {
    "SAFE": 3,
    "MODERATE": 2,
    "DREAM": 1,
}

def get_recommendations(
    db: Session,
    percentile: float,
    category: str,
    branch: str,
    year: int,
    min_status: str | None = None,
):
    rows = (
        db.query(Cutoff, College)
        .join(College, Cutoff.college_id == College.id)
        .filter(
            Cutoff.branch == branch,
            Cutoff.category == category,
            Cutoff.year == year
        )
        .all()
    )

    results = []

    for cutoff, college in rows:
        diff = percentile - cutoff.percentile_cutoff

        if diff >= 5:
            status = "SAFE"
        elif -5 <= diff < 5:
            status = "MODERATE"
        else:
            status = "DREAM"

        if min_status:
            if STATUS_RANK[status] < STATUS_RANK[min_status]:
                continue
            
        results.append({
            "college": college.name,
            "branch": branch,
            "cutoff": cutoff.percentile_cutoff,
            "difference": round(diff, 2),
            "status": status,
        })

    return sorted(results, key=lambda x: x["cutoff"])
