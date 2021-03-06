FROM node:12-alpine

WORKDIR /Reservation

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3002

EXPOSE 3002

CMD [ "npm", "run", "docker-setup" ]
