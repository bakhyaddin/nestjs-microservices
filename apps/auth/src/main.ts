import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { AuthAppConfigService } from '@app/common/configs/apps/auth';

import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const authAppConfigService = app.get(AuthAppConfigService);
  // registering the service as it can be communicated through the TCP connection
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: authAppConfigService.tcpPort,
    },
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      // stripts only decorated properties and pass to the service
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(authAppConfigService.httpPort);
}
bootstrap();
