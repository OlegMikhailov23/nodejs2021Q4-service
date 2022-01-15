FROM node:16-alpine

EXPOSE 4000

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm ci --only=prod && npm cache clean --force

RUN npm install global nodemon

RUN npm install

COPY . .

CMD ["npm", "start"]
