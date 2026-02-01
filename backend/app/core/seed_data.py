from backend.app.core.database import SessionLocal
from backend.app.models.college import College

def seed_colleges():
    db = SessionLocal()

    colleges = [
        College(name="COEP Technological University", city="Pune", college_type="Government"),
        College(name="VJTI Mumbai", city="Mumbai", college_type="Government"),
        College(name="PICT", city="Pune", college_type="Private"),
    ]

    db.add_all(colleges)
    db.commit()
    db.close()

    print("Sample colleges inserted")
