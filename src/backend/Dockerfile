FROM oven/bun:1.0.35 as base
WORKDIR /usr/src/app

FROM base AS install
COPY /src/backend .
RUN bun install --frozen-lockfile

FROM base as release
RUN mkdir -p /api
RUN mkdir -p /db

COPY --from=install /usr/src/app/node_modules node_modules
COPY --from=install /usr/src/app/package.json package.json
COPY --from=install /usr/src/app/api api
COPY --from=install /usr/src/app/db db


USER bun
ENTRYPOINT [ "bun", "run", "api/index.ts"]
