FROM node:16-alpine

WORKDIR /web

COPY package.json ./
COPY .eslintrc.json ./

RUN ["npm", "install"]

COPY ./src ./src
COPY ./public ./public
COPY *.js ./
COPY *.ts ./

RUN ["npm", "run", "build"]
CMD ["npm", "run", "dev"]
