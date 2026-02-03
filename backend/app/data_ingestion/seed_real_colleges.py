from backend.app.core.database import SessionLocal
from backend.app.models.college import College

def seed_real_colleges():
    db = SessionLocal()

    colleges = [
        College(
            name="Government College of Engineering, Amravati",
            city="Amravati",
            college_type="Government",
        )
    ]

    for college in colleges:
        exists = db.query(College).filter(College.name == college.name).first()
        if not exists:
            db.add(college)

    db.commit()
    db.close()
    print("Real colleges seeded")

if __name__ == "__main__":
    seed_real_colleges()
