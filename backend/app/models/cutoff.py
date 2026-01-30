from sqlalchemy import Column, Integer, String, Float
from backend.app.core.database import Base

class Cutoff(Base):
    __tablename__ = "cutoffs"

    id = Column(Integer, primary_key=True, index=True)
    college_id = Column(Integer, nullable=False)
    branch = Column(String, nullable=False)
    category = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    round = Column(Integer, nullable=False)
    percentile_cutoff = Column(Float, nullable=False)
