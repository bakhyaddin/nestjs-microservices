import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { NotificationsAppConfigService } from '@app/common/configs/apps/notifications';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);

  const notificationsAppConfigService = app.get(NotificationsAppConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: notificationsAppConfigService.port,
    },
  });

  app.useLogger(app.get(Logger));

  app.startAllMicroservices();
}
bootstrap();
