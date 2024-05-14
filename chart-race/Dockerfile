FROM node:22-alpine AS builder  # Use a multi-stage build for efficiency

WORKDIR /app  # Change working directory to improve organization

# Set environment variables
ENV TZ=Asia/Bangkok
ENV API_ENDPOINT=http://localhost  # Consider using environment variables for API configuration in production
ENV API_PORT=3000
ENV DB_HOST=db

# Install build dependencies only in the builder stage
RUN apk update && apk add --no-cache tzdata npm

COPY package*.json ./  # Copy package files before installing dependencies

RUN npm install -g pnpm  # Install pnpm globally (optional)
RUN pnpm install  # Install project dependencies

# Switch to a smaller runtime image
FROM node:22-alpine

WORKDIR /app  # Copy working directory

COPY . .  # Copy entire project directory

# Build the application (replace with your build command if needed)
RUN pnpm run build

# Start the application
CMD ["pnpm", "start"]
