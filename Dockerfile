FROM node:16-alpine AS development

EXPOSE 4000

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm ci --only=prod && npm cache clean --force

RUN npm install global @nestjs/cli

COPY . .

CMD ["npm", "start"]
