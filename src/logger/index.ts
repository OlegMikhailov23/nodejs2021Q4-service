const { createLogger, format, transports } = require('winston');
const { printf, timestamp, combine, colorize } = format;

// @ts-ignore
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
    new transports.Console()
  ]
});
