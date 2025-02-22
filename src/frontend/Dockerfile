# # use the official Bun image
# # see all versions at https://hub.docker.com/r/oven/bun/tags
# FROM oven/bun:1 AS base
# WORKDIR /usr/src/app

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/dev
# COPY /src/frontend/package.json /src/frontend/bun.lockb /temp/dev/
# RUN cd /temp/dev && bun install --frozen-lockfile

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY /src/frontend/package.json /src/frontend/bun.lockb /temp/prod/
# RUN cd /temp/prod && bun install --frozen-lockfile --production

# # copy node_modules from temp directory
# # then copy all (non-ignored) project files into the image
# FROM base AS prerelease
# COPY --from=install /temp/dev/node_modules node_modules
# COPY /src/frontend .

# # [optional] tests & build
# ENV NODE_ENV=production
# RUN bun test
# RUN bun run build

# # copy production dependencies and source code into final image
# FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
# #COPY --from=prerelease index.ts .
# COPY --from=prerelease package.json .

# # run the app
# USER bun
# EXPOSE 1234/tcp
# CMD [ "bun", "run", "dev" ]

FROM oven/bun

WORKDIR /app

# Copy package.json + package-lock.json
COPY src/frontend/package*.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY src/frontend/ .

# Start the dev server
CMD ["bun", "--bun", "run", "dev", "-p", "1234"]