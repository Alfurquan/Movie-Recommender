import pandas as pd
import numpy as np
from pandas import DataFrame
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List
from movie_recommender.schemas.movie import Movie
from ..utils.pandas_utils import get_data_frame, get_movies_from_data_frame, convert_string_to_obj

# Get data from csv files
#df = get_data_frame()

# Get the director's name from the crew feature. If director is not listed, return NaN
def get_director(x):
    for i in x:
        if i['job'] == 'Director':
            return i['name']
    return np.nan

# Returns the list top 3 elements or entire list; whichever is more.
def get_list(x):
    if isinstance(x, list):
        names = [i['name'] for i in x]
        #Check if more than 3 elements exist. If yes, return only first three. If no, return entire list.
        if len(names) > 3:
            names = names[:3]
        return names

    #Return empty list in case of missing/malformed data
    return []

def clean_data(x):
    if isinstance(x, list):
        return [str.lower(i.replace(" ", "")) for i in x]
    else:
        if isinstance(x, str):
            return str.lower(x.replace(" ", ""))
        else:
            return ''

# We are now in a position to create our "metadata soup", 
# which is a string that contains all the metadata 
# that we want to feed to our vectorizer (namely actors, director and keywords).   
def create_soup(x):
    return ' '.join(x['keywords']) + ' ' + ' '.join(x['cast']) + ' ' + x['director']  + ' ' + ' '.join(x['genre_names'])

def preprocess_data():
    # Get data from csv files
    df = get_data_frame()

    # Parse the stringified features into their corresponding python objects
    features = ['cast', 'crew', 'keywords', 'genres']
    for feature in features:
        df = convert_string_to_obj(df, feature)


    # Define new director, cast, genres and keywords features that are in a suitable form.
    df['director'] = df['crew'].apply(get_director)

    features = ['cast', 'keywords']
    for feature in features:
        df[feature] = df[feature].apply(get_list)

    df['genre_names'] = df['genres'].apply(get_list)

    # Apply clean_data function to your features.
    features = ['cast', 'keywords', 'director', 'genre_names']

    for feature in features:
        df[feature] = df[feature].apply(clean_data)

    df['clean_title'] = df['title'].apply(clean_data)

    df['soup'] = df.apply(create_soup, axis=1)
    
    return df

def get_recommendations(title: str, df: DataFrame, limit: int = 11) -> List[Movie]:
    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(df['soup'])

    #Construct a reverse map of indices and movie titles
    indices = pd.Series(df.index, index=df['clean_title']).drop_duplicates()
    
    cosine_sim = cosine_similarity(count_matrix, count_matrix)

    # Get the index of the movie that matches the title
    clean_title = str.lower(title.replace(" ",  ""))
    
    # If movie title not in dataset
    if clean_title not in indices:
        return []
    
    idx = indices[clean_title]
    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))
    
    # Sort the movies based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get the scores of the 10 most similar movies
    sim_scores = sim_scores[1:limit]

    # Get the movie indices
    movie_indices = [i[0] for i in sim_scores]

    # Return the top 10 most similar movies
    df3 = df.iloc[movie_indices]
    
    return get_movies_from_data_frame(df3)
