const app = require('fastify')({ logger: true });
const { PORT } = require('./common/config');
import { myLogger } from './logger';

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'nodejs2021Q4-service' }
  }
});

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
    myLogger.error('Some error');
    myLogger.warn('Some warn');
    myLogger.error(new Error('something wen wrong'))
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();





