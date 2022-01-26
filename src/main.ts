import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { PORT, USE_FASTIFY } from "./common/config";

const DEFAULT_PORT = 3000;

console.log(USE_FASTIFY);

async function start() {
  let app;
  if (USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({
      logger: true }
      ));
  } else {
    app = await NestFactory.create(AppModule, {
      logger: ['log', 'warn']
    });
  }

  await app.listen(PORT || DEFAULT_PORT, "0.0.0.0");
}

start();
