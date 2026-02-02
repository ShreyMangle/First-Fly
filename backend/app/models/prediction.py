from sqlalchemy import Column, Integer, Float, String
from backend.app.core.database import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    student_percentile = Column(Float, nullable=False)
    college_id = Column(Integer, nullable=False)
    branch = Column(String, nullable=False)
    category = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    cutoff = Column(Float, nullable=False)
    probability = Column(Float, nullable=False)
