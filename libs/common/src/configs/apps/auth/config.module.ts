import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthAppConfigService } from './config.service';
import { AuthAppConfigValidator } from './config.validator';
import { ConfigValidator } from '../../config.validator';
import configurations from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validate: (config) =>
        ConfigValidator.validate(AuthAppConfigValidator, config),
    }),
  ],
  providers: [ConfigService, AuthAppConfigService],
  exports: [ConfigService, AuthAppConfigService],
})
export class AuthAppConfigModule {}
