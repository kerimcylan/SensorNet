FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i mongoose
RUN npm install body-parser
RUN npm install cors


COPY . .


CMD ["npm", "start"]
