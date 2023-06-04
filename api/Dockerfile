FROM node:16-alpine

WORKDIR /api

COPY package*.json ./

RUN ["npm", "install", "-g", "npm@latest"]
RUN ["npm", "install"]

COPY ./src ./src

COPY .env .env

CMD ["npm","run", "dev"]
