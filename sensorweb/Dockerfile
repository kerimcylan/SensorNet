FROM node:16-alpine

WORKDIR /

COPY package*.json ./
COPY *.json ./

RUN npm install

COPY . .

RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]
