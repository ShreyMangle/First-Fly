import re

def extract_percentile(cell: str):
    """
    Extract percentile value from strings like:
    '34240\\n(88.5013511)'
    """
    if not cell:
        return None

    match = re.search(r"\((\d+\.\d+)\)", cell)
    if match:
        return float(match.group(1))

    return None

def normalize_category(cat: str) -> str | None:
    if not cat:
        return None

    cat = cat.replace("\n", "").strip()

    if cat.endswith("H"):
        return None

    category_map = {
        "GOPENS": "OPEN",
        "GSCS": "SC",
        "GSTS": "ST",
        "GOBCS": "OBC",
        "GSEBCS": "EBC",
        "TFWS": "TFWS",
        "EWS": "EWS",
    }

    return category_map.get(cat)

def parse_cutoff_row(
    headers: list[str],
    row: list[str],
    year: int,
    college_name: str,
    branch: str,
):
    results = []

    round_code = row[0]
    if round_code not in ("I", "II", "III"):
        return results

    round_number = {"I": 1, "II": 2, "III": 3}[round_code]

    for idx in range(1, min(len(headers), len(row))):
        category = normalize_category(headers[idx])
        percentile = extract_percentile(row[idx])

        if category and percentile is not None:
            results.append({
                "college_name": college_name,
                "branch": branch,
                "year": year,
                "round": round_number,
                "category": category,
                "cutoff_percentile": percentile,
            })

    return results