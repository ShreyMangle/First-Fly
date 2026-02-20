import joblib
import os
import pandas as pd

BASE_DIR = os.path.dirname(__file__)

MODEL_PATH = os.path.join(BASE_DIR, "admission_probability_model.joblib")
FEATURE_PATH = os.path.join(BASE_DIR, "model_features.joblib")

model = joblib.load(MODEL_PATH)
model_features = joblib.load(FEATURE_PATH)


def predict_probability(
    student_percentile: float,
    cutoff_percentile: float,
    ml_category: str,
    round_value: int,
):

    df = pd.DataFrame([{
        "student_percentile": student_percentile,
        "cutoff_percentile": cutoff_percentile,
        "diff": student_percentile - cutoff_percentile,
        "ml_category": ml_category,
        "round": round_value
    }])

    df = pd.get_dummies(
        df,
        columns=["ml_category", "round"],
        drop_first=True
    )

    df = df.reindex(columns=model_features, fill_value=0)

    probability = model.predict_proba(df)[0][1]

    return float(probability)