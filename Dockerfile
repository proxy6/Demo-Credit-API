FROM node:14.16-alpine as development
WORKDIR /democredit
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run start:dev





