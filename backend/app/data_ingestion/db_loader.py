from sqlalchemy.orm import Session

from backend.app.core.database import SessionLocal
from backend.app.models.college import College
from backend.app.models.cutoff import Cutoff


def insert_cutoffs(cutoff_rows: list[dict]):
    db: Session = SessionLocal()

    for row in cutoff_rows:
        college = (
            db.query(College)
            .filter(College.name == row["college_name"])
            .first()
        )

        if not college:
            print(f"College not found: {row['college_name']}")
            continue

        existing = (
            db.query(Cutoff)
            .filter(
                Cutoff.college_id == college.id,
                Cutoff.branch == row["branch"],
                Cutoff.category == row["category"],
                Cutoff.year == row["year"],
                Cutoff.round == row["round"],
            )
            .first()
        )

        if existing:
            continue

        cutoff = Cutoff(
            college_id=college.id,
            branch=row["branch"],
            category=row["category"],
            year=row["year"],
            round=row["round"],
            percentile_cutoff=row["cutoff_percentile"],
        )

        db.add(cutoff)

    db.commit()
    db.close()
