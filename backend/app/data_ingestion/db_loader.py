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
            college = College(
                code=row["college_code"],
                name=row["college_name"],
                city=row["college_name"].split(",")[-1].strip(),
                college_type="Unknown"
            )
            db.add(college)
            db.commit()
            db.refresh(college)
    
        existing = (
            db.query(Cutoff)
            .filter(
                Cutoff.college_id == college.id,
                Cutoff.branch_code == row["branch_code"],
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
            branch_code=row["branch_name"],
            category=row["category"],
            year=row["year"],
            round=row["round"],
            percentile_cutoff=row["cutoff_percentile"],
        )

        db.add(cutoff)

    db.commit()
    db.close()
