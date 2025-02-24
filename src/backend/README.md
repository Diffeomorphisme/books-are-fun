# backend

The backend comprises the following parts:
- API: the API reached by the frontend
- Database: the declaration and repositories to interact with the database

The API documentation can be reached at the following addresses: 
- `localhost:3000/ui` for a human-friendly format 🧐
- `localhost:3000/doc` for a harder to read format 🤖

To install dependencies:

```bash
bun install
```

To run in development mode
```bash
bun dev
```

Summary of to dos:
- protect API behind authentication
- change hard-coded connection strings to environment-based declarations
- Add endpoint end-to-end testing