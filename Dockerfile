FROM node:11-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY ./src ./src

EXPOSE 4000

CMD [ "npm", "start" ]