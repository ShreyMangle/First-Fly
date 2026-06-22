from sqlalchemy.orm import Session

from backend.app.models.cutoff import Cutoff
from backend.app.models.college import College
from backend.app.ml.predictor import predict_probability

# Higher rank = better (SAFE is "safest" for inclusion)
STATUS_RANK = {
    "SAFE": 3,
    "MODERATE": 2,
    "DREAM": 1,
}


def get_recommendations(
    db: Session,
    percentile: float,
    category: str,
    branch_code: str,
    year: int,
    min_status: str | None = None,
) -> list[dict]:
    rows = (
        db.query(Cutoff, College)
        .join(College, College.id == Cutoff.college_id)
        .filter(
            Cutoff.category == category,
            Cutoff.branch_code == branch_code,
            Cutoff.year == year,
        )
        .all()
    )

    results = []
    min_rank = STATUS_RANK.get(min_status, 0) if min_status else 0

    for cutoff, college in rows:
        probability = predict_probability(
            student_percentile=percentile,
            cutoff_percentile=cutoff.percentile_cutoff,
            ml_category=category,
            round_value=cutoff.round,
        )

        if probability >= 0.75:
            status = "SAFE"
        elif probability >= 0.48:
            status = "MODERATE"
        else:
            status = "DREAM"

        # ✅ Fixed: actually filter by min_status using rank comparison
        if min_rank > 0 and STATUS_RANK.get(status, 0) < min_rank:
            continue

        difference = round(percentile - cutoff.percentile_cutoff, 2)

        results.append({
            "college_name": college.name,
            "branch_name": cutoff.branch_name,
            "category": cutoff.category,
            "year": cutoff.year,
            "round": cutoff.round,
            "cutoff": cutoff.percentile_cutoff,
            "difference": difference,
            "probability": round(probability, 3),
            "status": status,
        })

    results.sort(key=lambda x: x["probability"], reverse=True)
    return results
