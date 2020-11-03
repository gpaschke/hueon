/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  // Swagger UI - dynamic import
  if(!process.env.PORT) {
    console.log('process.env.PORT');
    console.log(process.env.PORT);
    const sw = await import('@nestjs/swagger')
    const options = new sw.DocumentBuilder()
      .setTitle('API example')
      .setDescription('Custom API description')
      .setVersion('1.0')
      .build();
    const document = sw.SwaggerModule.createDocument(app, options)
    sw.SwaggerModule.setup(globalPrefix, app, document)
  }

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
