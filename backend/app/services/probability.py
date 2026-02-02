def calculate_probability(student_percentile: float, cutoff_percentile: float) -> float:
    margin = student_percentile - cutoff_percentile

    if margin >= 5:
        return 0.9
    elif margin >= 2:
        return 0.75
    elif margin >= 0:
        return 0.6
    elif margin >= -2:
        return 0.3
    else:
        return 0.1
