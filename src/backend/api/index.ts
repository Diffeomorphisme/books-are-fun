import { Hono } from "hono";
import { cors } from 'hono/cors'
import { logger } from "hono/logger";
import bookRouter from "./routes/book/routes"

const app = new Hono();

const routes = app
  .use(logger())
  .use('/api/*', cors())
  .route("/api/books", bookRouter);

export default app;

export type Api = typeof routes;
