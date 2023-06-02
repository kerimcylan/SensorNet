FROM node:16-alpine

WORKDIR /

COPY package*.json ./
COPY ./.next/*.json ./.next/

RUN npm install

COPY . .

RUN ["npm", "run", "build"]
CMD ["npm", "run", "start"]
