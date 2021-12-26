import { FastifyReply, FastifyRequest } from 'fastify';

const app = require('fastify')({
  logger: false,
  pluginTimeout: 100000,
  prettyPrint: true});
const { PORT } = require('./common/config');
import { myLogger } from './logger';

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'nodejs2021Q4-service' }
  }
});

app.setErrorHandler(function (error: any, request: FastifyRequest, reply: FastifyReply) {
  // Log error
  app.log.error(error)
  // Custom Logging
  myLogger.error(new Error('Oops! Something goes wrong:('));
  // Send error response
  reply.status(500).send({ ok: false, message: 'Something goes wrong:(' })
})

app.register(require('./routes/userRoutes'));
app.register(require('./routes/boardRoutes'));
app.register(require('./routes/taskRoutes'));

/**
 * This starts the fastify server.
 *
 * @returns Promise<void>
 *
 */

const start = async (): Promise<void> => {
  try {
    await app.listen(PORT);
    myLogger.info(`Hello! Server is running on ${PORT} port`);
  } catch (e) {
    app.log.fatal(e);
    myLogger.error(new Error('Oops! application felt-down with error ...'));
    process.exit(1);
  }
};

start();





