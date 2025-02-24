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

# To do - optimise to minimise the size of the image
# To do - find another way than running a dev script