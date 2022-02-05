import { User } from '../entities/User';
import { Task } from '../entities/Task';
import { Board } from '../entities/Board';
import { httpMethods } from '../utils';

const { createLogger, format, transports } = require('winston');

const { printf, timestamp, combine, colorize } = format;

const myFormat = printf(
  // @ts-ignore: next-line
  ({ level, message, timestamp, stack }) =>
    `[${timestamp}] ${level}: ${stack || message}`,
);

const getLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'warn';

export const myLogger = createLogger({
  level: getLevel,
  format: combine(
    colorize(),
    timestamp({ format: 'HH:mm:ss' }),
    format.errors({ stack: true }),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/common.log' }),
    new transports.File({
      filename: 'logs/errors.log',
      level: 'error',
    }),
  ],
});

export const loggerMessages = {
  getAll(url: string, code: number): string {
    return `${httpMethods.GET} URL: ${url}\n\
            Status code ${code}\n`;
  },

  getSingle(url: string, query: string, code: number): string {
    return `${httpMethods.GET} request URL:${url}\n\
            query-params: ${query}\n\
            with status code ${code}`;
  },

  addItem(
    url: string,
    code: number,
    body: Partial<User> | Partial<Task> | Partial<Board>,
  ): string {
    return `${httpMethods.POST} request URL: ${url}\n\
            status code ${code}\n\
            payload: ${JSON.stringify(body)}\n`;
  },

  deleteItem(url: string, query: string, code: number): string {
    return `${httpMethods.DELETE} request URL:${url}\n\
            query-params: ${query}\n\
            status code ${code}\n
            `;
  },

  updateItem(
    url: string,
    query: string,
    code: number,
    body: Partial<User> | Partial<Task> | Partial<Board>,
  ): string {
    return `${httpMethods.PUT} request URL: ${url}\n\
            status code ${code}\n\
            payload: ${JSON.stringify(body)}\n`;
  },
};
