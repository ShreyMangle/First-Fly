from pydantic import BaseModel


class RecommendationResponse(BaseModel):
    college_name: str
    branch_name: str
    category: str
    year: int
    round: int
    cutoff: float
    difference: float
    probability: float
    status: str

    model_config = {"from_attributes": True}
