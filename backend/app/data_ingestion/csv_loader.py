import csv
from pathlib import Path
from typing import List, Dict


def load_cutoffs_from_csv(csv_path: str) -> List[Dict]:
    records = []
    csv_path = Path(csv_path)

    with open(csv_path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            records.append({
                "college_code": row["college_code"].strip(),
                "college_name": row["college_name"].strip(),
                "branch_code": row["branch_code"].strip(),
                "branch_name": row["branch_name"].strip(),
                "category": row["category"].strip(),
                "year": int(row["year"]),
                "round": int(row["round"]),
                "percentile": float(row["percentile"]),
            })

    return records
