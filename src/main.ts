import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ConnectionOptions from './common/ormconfig';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe, Logger } from '@nestjs/common';

import { PORT, USE_FASTIFY } from './common/config';
import { getPlatform } from './utils';
import { createConnection } from 'typeorm';
import { myLogger } from './logger';

const DEFAULT_PORT = 3000;

async function start() {
  try {
    const connection = await createConnection(ConnectionOptions);
    await connection.runMigrations();
    const config = new DocumentBuilder()
      .setTitle('nodejs2021q4-service')
      .setVersion('1.0')
      .build();
    let app;
    if (USE_FASTIFY === 'true') {
      app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
          logger: true,
        }),
      );
    } else {
      app = await NestFactory.create(AppModule, {
        logger: ['log', 'warn'],
      });
    }

    app.useGlobalPipes(new ValidationPipe());
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(PORT || DEFAULT_PORT, '0.0.0.0');
    Logger.log(
      `App start on url http://localhost:${PORT}, on ${getPlatform(
        USE_FASTIFY,
      )} platform`,
    );
  } catch (e) {
    myLogger.error(new Error('Oops! application felt-down with error ...'));
    process.exit(1);
  }
}

start();
