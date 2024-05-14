FROM node:22-alpine3.18

WORKDIR /usr/src/app

ENV TZ=Asia/Bangkok

ARG APP_DOMAIN
ARG API_ENDPOINT
ARG API_PORT

ENV APP_DOMAIN=${APP_DOMAIN}
ENV API_ENDPOINT=${API_ENDPOINT}
ENV API_PORT=${API_PORT}

RUN apk update

RUN apk add --no-cache tzdata
RUN npm install -g pnpm
COPY package*.json ./
COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm run build
EXPOSE 443
CMD ["pnpm", "start"]
