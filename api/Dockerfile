FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i mongoose

COPY . .


CMD ["npm", "start"]
