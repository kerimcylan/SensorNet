FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY .env .env


RUN npm install
RUN npm install mongodb

COPY . .

CMD ["sh", "-c", "source .env && npm start"]