import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ReservationsAppConfigService } from './config.service';
import { ReservationsAppCofigValidator } from './config.validator';
import { ConfigValidator } from '../../config.validator';
import configurations from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validate: (config) =>
        ConfigValidator.validate(ReservationsAppCofigValidator, config),
    }),
  ],
  providers: [ConfigService, ReservationsAppConfigService],
  exports: [ConfigService, ReservationsAppConfigService],
})
export class ReservationsAppConfigModule {}
