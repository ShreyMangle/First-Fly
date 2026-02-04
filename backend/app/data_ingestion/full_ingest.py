from backend.app.data_ingestion.pdf_parser import extract_full_context_tables
from backend.app.data_ingestion.normalizer import parse_cutoff_row
from backend.app.data_ingestion.db_loader import insert_cutoffs


def ingest_pdf(pdf_path: str, year: int, max_pages: int = 5):
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
