FROM alpine:3.15

RUN apk add --update npm

EXPOSE 4000

WORKDIR /usr/app/src

RUN npm install global nodemon

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
