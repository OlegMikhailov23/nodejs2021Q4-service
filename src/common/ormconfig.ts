import { ConnectionOptions } from 'typeorm';

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

// @ts-ignore
export default {
  type: 'postgres',
  host: 'postgres',
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    'dist/entities/*.js',
  ],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'dist/migrations',
  },
} as ConnectionOptions;
