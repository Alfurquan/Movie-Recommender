Movie Recommender
=================

A full stack movie recommendation app using python, Fast API and React.

# Getting started

In order to get started with this project, make sure you have these pre requisites installed and setup on your machine

## Prerequisities

1. Install [python](https://www.python.org/) version 3.10+
2. Install [poetry](https://python-poetry.org/docs/#installation)
3. Install [node.js](https://nodejs.org/en/download/prebuilt-installer/current)

## Manual setup

### Backend Setup

#### Steps
1. Git clone the repo
2. Go to repo root\Backend\Movie-Recommender and run `poetry install` to install all dependencies
3. Run `poetry shell` to launch a poetry shell terminal
4. Run `movie-recommender` to launch the web server which will be listening on `http://0.0.0.0:8000`
5. You can view all API endpoints at this address `http://localhost:8000/docs` 


### Frontend setup
1. Git clone the repo
2. Go to repo root\Frontend\Movie-Recommender and run `npm install` to install all dependencies
3. Run `npm run dev` to launch the react app

## Using Docker

If using docker make sure to have docker installed.
Go to repo root and run `docker-compose up` to launch the docker containers

