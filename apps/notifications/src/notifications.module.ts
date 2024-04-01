import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import {
  NotificationsAppConfigModule,
  NotificationsAppConfigService,
} from '@app/common/configs/apps/notifications';
import { LoggerModule } from '@app/common';

@Module({
  imports: [NotificationsAppConfigModule, LoggerModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsAppConfigService],
})
export class NotificationsModule {}
