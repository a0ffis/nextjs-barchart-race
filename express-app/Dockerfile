# Use a slim Node.js image for efficiency
FROM node:22-alpine3.18

WORKDIR /app

# Copy package.json and package-lock.json (if using) for dependency installation
COPY package*.json ./

RUN npm install

COPY ./ ./

ENV NODE_ENV production

CMD ["node", "src/app.js"]

