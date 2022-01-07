FROM node:16-alpine

EXPOSE 4000

WORKDIR /usr/app/src

RUN yarn global add nodemon

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
