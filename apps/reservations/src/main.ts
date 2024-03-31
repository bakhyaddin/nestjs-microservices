import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

import { ReservationsAppConfigService } from '@app/common/configs/apps/reservations';

import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      // stripts only decorated properties and pass to the service
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(Logger));
  const reservationsAppConfigService = app.get(ReservationsAppConfigService);
  await app.listen(reservationsAppConfigService.port);
}
bootstrap();
