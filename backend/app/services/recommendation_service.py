from sqlalchemy.orm import Session
from backend.app.models.cutoff import Cutoff
from backend.app.models.college import College
from backend.ml.predictor import predict_probability

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
):
    results = []

    rows = (
        db.query(Cutoff,College)
        .join(College, College.id == Cutoff.college_id)
        .filter(
            Cutoff.category == category,
            Cutoff.branch_code == branch_code,
            Cutoff.year == year,
        )
        .all()
    )

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

        if min_status and status not in ("SAFE", "MODERATE", "DREAM"):
            continue

        results.append({
            "college_name": college.name,
            "branch_name": cutoff.branch_name,
            "category": cutoff.category,
            "year": cutoff.year,
            "round": cutoff.round,
            "cutoff": cutoff.percentile_cutoff,
            "probability": round(probability, 3),
            "status": status,
        })

    results.sort(key=lambda x: x["probability"], reverse=True)
    
    return results
