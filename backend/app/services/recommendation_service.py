from sqlalchemy.orm import Session
from backend.app.models.cutoff import Cutoff
from backend.app.models.college import College


def get_recommendations(
    db: Session,
    percentile: float,
    category: str,
    branch: str,
    year: int,
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

        results.append({
            "college": college.name,
            "branch": branch,
            "cutoff": cutoff.percentile_cutoff,
            "status": status,
        })

    return sorted(results, key=lambda x: x["cutoff"])
