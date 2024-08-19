from fastapi import APIRouter, Query, Request
from typing import List
import random
from ..schemas.movie import Movie, MovieRecommendation
from ..recommender.app import get_recommendations
from ..utils.file_utils import append_to_csv_file, read_csv_file
from ..utils.pandas_utils import get_movies_from_data_frame

router = APIRouter(
    prefix="/api/movies"
)

@router.get("/", response_model=List[Movie])
def get_movies(request: Request):
    return get_movies_from_data_frame(request.app.state.model)

@router.get("/autocomplete", response_model=List[str])
def get_matching_movies(request: Request, movie_name: str = Query(..., min_length=1)):
    prefix_tree = request.app.state.prefix_tree
    matched_movie_names: List[str] = prefix_tree.words_with_prefix(movie_name.replace(" ", "").lower())
    return matched_movie_names[:11]
    
@router.get("/user_liked", response_model=List[Movie])
def get_user_liked_movies(request: Request):
    content = read_csv_file('movie_recommender/data/user_searched_movies.csv')
    
    if len(content) == 0:
        return []
    new_movies = []
    new_movies.append(random.choice(content))
    
    movie_name = new_movies[0][0]
    return get_recommendations(movie_name, request.app.state.model, limit=7)
    
@router.post("/recommend", response_model=List[Movie])
def recommend_movies(request: Request, movie : MovieRecommendation):
    movies = get_recommendations(movie.title, request.app.state.model)
    if len(movies) > 0:
        append_to_csv_file('movie_recommender/data/user_searched_movies.csv', {'Movie':movie.title}, ['Movie'])
    return movies