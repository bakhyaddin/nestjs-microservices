import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ConfigValidator } from '../../config.validator';
import { NotificationsAppConfigValidator } from './config.validator';
import { NotificationsAppConfigService } from './config.service';
import configurations from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validate: (config) =>
        ConfigValidator.validate(NotificationsAppConfigValidator, config),
    }),
  ],
  providers: [ConfigService, NotificationsAppConfigService],
  exports: [ConfigService, NotificationsAppConfigService],
})
export class NotificationsAppConfigModule {}
