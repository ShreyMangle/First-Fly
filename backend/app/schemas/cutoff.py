from pydantic import BaseModel

class CutoffOut(BaseModel):
    id: int
    college_id: int
    branch_code: str
    branch_name: str
    category: str
    year: int
    round: int
    percentile_cutoff: float

    class Config:
        orm_mode = True
