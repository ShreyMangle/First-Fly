from backend.app.data_ingestion.csv_loader import load_cutoffs_from_csv
from backend.app.data_ingestion.db_loader import insert_cutoffs

def run():
    rows = load_cutoffs_from_csv("backend/data/cutoffs.csv")
    insert_cutoffs(rows)
    print("CSV data imported successfully")

if __name__ == "__main__":
    run()
