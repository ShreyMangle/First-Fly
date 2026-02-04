import pdfplumber
import re

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

def extract_college_headers(pdf_path: str, max_pages: int = 5):
    colleges = set()  

    pattern = re.compile(r"\d{5}\s*-\s*(.+)")

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages[:max_pages]:
            text = page.extract_text()
            if not text:
                continue

            for line in text.split("\n"):
                match = pattern.match(line.strip())
                if match:
                    colleges.add(match.group(1).strip())

    return sorted(colleges)

def extract_college_branch_pairs(pdf_path: str, max_pages: int = 5):
    """
    Extract (college_name, branch_name) pairs in order of appearance.
    """
    college_pattern = re.compile(r"\d{5}\s*-\s*(.+)")
    branch_pattern = re.compile(r"\d{10}\s*-\s*(.+)")

    results = []
    current_college = None

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages[:max_pages]:
            text = page.extract_text()
            if not text:
                continue

            for line in text.split("\n"):
                line = line.strip()

                college_match = college_pattern.match(line)
                if college_match:
                    current_college = college_match.group(1).strip()
                    continue

                branch_match = branch_pattern.match(line)
                if branch_match and current_college:
                    branch_name = branch_match.group(1).strip()
                    results.append({
                        "college": current_college,
                        "branch": branch_name
                    })

    return results

def extract_full_context_tables(pdf_path: str, max_pages: int = 5):
    """
    Yields tables with full context:
    college, branch, headers, rows
    """
    college_pattern = re.compile(r"\d{5}\s*-\s*(.+)")
    branch_pattern = re.compile(r"\d{10}\s*-\s*(.+)")

    results = []

    current_college = None
    current_branch = None

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages[:max_pages]:
            text = page.extract_text()
            table = page.extract_table()

            if text:
                for line in text.split("\n"):
                    line = line.strip()

                    college_match = college_pattern.match(line)
                    if college_match:
                        current_college = college_match.group(1).strip()
                        continue

                    branch_match = branch_pattern.match(line)
                    if branch_match:
                        current_branch = branch_match.group(1).strip()
                        continue

            if table and current_college and current_branch:
                headers = table[0]
                rows = table[1:]

                results.append({
                    "college": current_college,
                    "branch": current_branch,
                    "headers": headers,
                    "rows": rows
                })

    return results
