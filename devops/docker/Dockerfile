FROM node:20.11.1

WORKDIR /usr/src/app

ENV TMPDIR "../../artifacts/tmp"

COPY package.json package-lock.json ./

RUN npm install

COPY . .
