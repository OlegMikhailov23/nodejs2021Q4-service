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


const start = async () => {
  try {
    await app.listen(PORT);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
}

start();





