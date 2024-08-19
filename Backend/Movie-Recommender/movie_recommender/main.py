from contextlib import asynccontextmanager
from fastapi import FastAPI
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from .recommender.app import preprocess_data
from .data_structures.trie import Trie
from .api import movie
import uvicorn

@asynccontextmanager
async def lifespan(app: FastAPI):
    model = preprocess_data()
    trie = Trie()
    titles: List[str] = model['title'].tolist()
    for title in titles:
        clean_title = title.replace(" ", "").lower()
        trie.insert(clean_title, title)
    
    app.state.model = model
    app.state.prefix_tree = trie
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(movie.router)

def main():
    """
    Entry point of the app
    """
    uvicorn.run("movie_recommender.main:app", host="0.0.0.0", port=8001, reload=True)

if __name__ == '__main__':
    main()