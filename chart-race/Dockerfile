
FROM node:22-alpine3.18

WORKDIR /usr/src/app

ENV TZ=Asia/Bangkok
ENV API_ENDPOINT=http://localhost
ENV API_PORT=3000
ENV DB_HOST=db

RUN apk update
RUN apk add vim

RUN apk add --no-cache tzdata

RUN npm install -g pnpm
COPY ./package*.json ./
RUN pnpm install
COPY ./ ./
RUN rm -rf .env

RUN pnpm run build

CMD ["pnpm", "start"]
