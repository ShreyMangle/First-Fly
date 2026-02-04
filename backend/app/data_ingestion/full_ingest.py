from backend.app.data_ingestion.pdf_parser import extract_full_context_tables
from backend.app.data_ingestion.normalizer import parse_cutoff_row
from backend.app.data_ingestion.db_loader import insert_cutoffs


def ingest_pdf(pdf_path: str, year: int, max_pages: None):
    all_cutoffs = []

    context_tables = extract_full_context_tables(pdf_path, max_pages=max_pages)

    for item in context_tables:
        college = item["college"]
        branch = item["branch"]
        headers = item["headers"]
        rows = item["rows"]

        for row in rows:
            cutoffs = parse_cutoff_row(
                headers=headers,
                row=row,
                year=year,
                college_name=college,
                branch=branch
            )
            all_cutoffs.extend(cutoffs)

    insert_cutoffs(all_cutoffs)
    print(f"Ingested {len(all_cutoffs)} cutoff records")

if __name__ == "__main__":
    ingest_pdf(
        pdf_path="data/raw/2024ENGG_CAP1_CutOff.pdf",
        year=2024,
        max_pages=None  
    )
