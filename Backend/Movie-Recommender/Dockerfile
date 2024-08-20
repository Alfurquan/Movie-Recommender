FROM python:3.10

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install

EXPOSE 8001

CMD ["poetry", "run", "python", "./movie_recommender/main.py"]
