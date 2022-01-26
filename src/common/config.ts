import * as dotenv from 'dotenv'
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

export const PORT = process.env.PORT;
export const USE_FASTIFY = process.env.USE_FASTIFY;
  // POSTGRES_PORT: process.env.POSTGRES_PORT,
  // POSTGRES_USER: process.env.POSTGRES_USER,
  // POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  // POSTGRES_DB: process.env.POSTGRES_DB,
  // JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  // AUTH_MODE: process.env.AUTH_MODE === 'true'

