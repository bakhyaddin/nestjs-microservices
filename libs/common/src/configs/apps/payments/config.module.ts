import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ConfigValidator } from '../../config.validator';
import { PaymentsAppCofigValidator } from './config.validator';
import { PaymentsAppConfigService } from './config.service';
import configurations from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validate: (config) =>
        ConfigValidator.validate(PaymentsAppCofigValidator, config),
    }),
  ],
  providers: [ConfigService, PaymentsAppConfigService],
  exports: [ConfigService, PaymentsAppConfigService],
})
export class PaymentsAppConfigModule {}
