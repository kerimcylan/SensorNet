FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install mongodb

COPY . .

CMD ["npm", "start"]
