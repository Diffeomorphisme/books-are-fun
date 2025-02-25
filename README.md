# books-are-fun
📚 Books are fun! 📚

The project is divided into two parts:
- a backend, which consists of:
  - the API (consumed by the frontend)
  - the database, with its schema and repositories (used by certain calls to the API)
- a frontend, which interacts with the API to display a list of books


## Running the project

### Docker
From the root of the project, run:
```bash
docker compose up -d
```
The frontend is reachable [here](http://127.0.0.1:1234)


## To dos

- For frontend/backend specific todo, refer to their respective READMEs.
- docker compose: introduce environment variables at this stage
