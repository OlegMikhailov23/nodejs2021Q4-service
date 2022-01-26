import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { PORT, USE_FASTIFY } from "./common/config";

const DEFAULT_PORT = 3000;

console.log(USE_FASTIFY);

async function start() {
  const config = new DocumentBuilder()
    .setTitle('nodejs2021q4-service')
    .setVersion('1.0')
    .build();

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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(PORT || DEFAULT_PORT, "0.0.0.0");
}

start();
