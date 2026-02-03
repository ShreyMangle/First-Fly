import pdfplumber

def extract_raw_tables(pdf_path: str, max_pages: int = 3):
    all_tables = []

    with pdfplumber.open(pdf_path) as pdf:
        for page_number, page in enumerate(pdf.pages[:max_pages], start=1):
            table = page.extract_table()
            if table:
                print(f"\n--- Page {page_number} ---")
                for row in table[:10]:  
                    print(row)

                all_tables.append(table)

    return all_tables
