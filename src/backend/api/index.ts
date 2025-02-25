import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { cors } from 'hono/cors'
import { logger } from "hono/logger";
import bookRouter from "./routes/book/routes"

const app = new OpenAPIHono();

const routes = app
  .use(logger())
  .use('/api/*', cors())
  .route("/api/books", bookRouter)
  .get('/ui', swaggerUI({ url: '/doc' }));

// The OpenAPI documentation available at /doc
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Books are fun API',
  },
})

export default app;

export type Api = typeof routes;

// To do - Protect API access behind authentication