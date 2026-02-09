from sqlalchemy import Column, Integer, String, Float, ForeignKey
from backend.app.core.database import Base

class Cutoff(Base):
    __tablename__ = "cutoffs"

    id = Column(Integer, primary_key=True, index=True)
    college_id = Column(
        Integer,
        ForeignKey("colleges.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    branch_code = Column(String, nullable=False)
    branch_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    round = Column(Integer, nullable=False)
    percentile_cutoff = Column(Float, nullable=False)
