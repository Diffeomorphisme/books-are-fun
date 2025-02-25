FROM oven/bun

WORKDIR /app

# Copy package.json + package-lock.json
COPY src/frontend/package*.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY src/frontend/ .

# Build and start the nextjs app
RUN bun next build
CMD ["bun", "--bun", "run", "next", "start", "-p", "1234"]

# To do - optimise to minimise the size of the image