import { Board, Task, User } from '../interfaces/interfaces';

const { createLogger, format, transports } = require('winston');
const { printf, timestamp, combine, colorize } = format;

// @ts-ignore: next-line
const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${timestamp}] ${level}: ${stack || message}`;
});


export const myLogger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: 'HH:mm:ss' }),
    format.errors({stack: true}),
    myFormat),
  transports: [
    new transports.Console(),
    new transports.File({filename: 'common.log'}),
    new transports.File({
      filename: 'errors.log',
      level: 'error'
    })
  ]
});

export const loggerMessages = {
  getAll(method: string , url: string, code: number ): string {
    return `${method} URL: ${url}\n\
            Status code ${code}\n`
  },

  getSingle(method: string ,url: string, query:string ,code: number) : string {
    return `${method} request URL:${url}\n\
            query-params: ${query}\n\ 
            with status code ${code}`
  },

  addItem(method: string,url: string,code: number, body: User | Task | Board) : string {
    return `${method} request URL: ${url}\n\
            status code ${code}\n\
            payload: ${JSON.stringify(body)}\n`
  },

  deleteItem(method: string, url: string, query:string ,code: number): string {
    return `${method} request URL:${url}\n\
            query-params: ${query}\n\
            status code ${code}\n
            `
  },

  updateItem(method: string, url: string, query:string ,code: number, body: User | Task | Board): string {
    return `${method} request URL: ${url}\n\
            status code ${code}\n\
            payload: ${JSON.stringify(body)}\n`
  }
}
