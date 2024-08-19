import pandas as pd
from pandas import DataFrame
from ..schemas.movie import Movie
from ast import literal_eval

def get_data_frame():
    df1 = pd.read_csv('movie_recommender/data/tmdb_5000_credits.csv')
    df2 = pd.read_csv('movie_recommender/data/tmdb_5000_movies.csv')
    df1.columns = ['id', 'tittle', 'cast', 'crew']
    df2 = df2.merge(df1, on='id')
    df2['poster_path'] = df2['poster_path'].fillna('')
    df2['vote_average'] = df2['vote_average'].fillna(0)
    df2['release_date'] = df2['release_date'].fillna('')
    return df2

def convert_string_to_obj(pd: DataFrame, column: str):
    pd[column] = pd[column].apply(literal_eval)
    return pd

def get_movies_from_data_frame(df: DataFrame):
    df = df[['id', 'title', 'genres', 'poster_path', 'vote_average', 'release_date']]
    return df.apply(lambda row: Movie(id=row['id'], 
                                      title=row['title'], 
                                      genres=row['genres'], 
                                      poster_path=row['poster_path'],
                                      vote_average=row['vote_average'],
                                      release_date=row['release_date']), 
                    axis=1).tolist()