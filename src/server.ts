const app = require("fastify")({logger: true});
const { PORT } = require('./common/config');

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {title: 'nodejs2021Q4-service'},
  },
});

app.register(require('./routes/userRoutes'));
app.register(require('./routes/boardRoutes'));
app.register(require('./routes/taskRoutes'));


const start = async () => {
  try {
    await app.listen(PORT);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
}

start();





