from backend.app.core.database import SessionLocal
from backend.app.models.cutoff import Cutoff

def clear_cutoffs():
    db = SessionLocal()
    deleted = db.query(Cutoff).delete()
    db.commit()
    db.close()
    print(f"Deleted {deleted} cutoff rows")
    
if __name__ == "__main__":
    clear_cutoffs()
