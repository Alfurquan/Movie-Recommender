from pydantic import BaseModel
from typing import List

class Genre(BaseModel):
    id: int | None
    name: str | None
    
class Movie(BaseModel):
    id: int
    title: str
    genres: List[Genre] = []
    poster_path: str | None = None
    vote_average: float | None
    release_date: str | None

class MovieRecommendation(BaseModel):
    title: str
