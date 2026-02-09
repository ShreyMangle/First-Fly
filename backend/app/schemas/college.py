from pydantic import BaseModel

class CollegeOut(BaseModel):
    id: int
    code: str
    name: str
    city: str
    college_type: str

    class Config:
        orm_mode = True
