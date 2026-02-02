from pydantic import BaseModel

class CutoffOut(BaseModel):
    id: int
    college_id: int
    branch: str
    category: str
    year: int
    round: int
    percentile_cutoff: float

    class Config:
        orm_mode = True
