FROM node:16-alpine

WORKDIR /api

COPY package*.json ./

RUN ["npm", "install"]
ARG DB_CONNECTION
ENV DB_CONNECTION $DB_CONNECTION

RUN echo ${DB_CONNECTION}
COPY ./src ./src

CMD npm run ${STAGE}
