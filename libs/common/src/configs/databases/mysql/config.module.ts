import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MySqlVariablesValidation } from './config.validator';
import { MySqlConfigService } from './config.service';
import { ConfigValidator } from '../../config.validator';
import configurations from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validate: (config) =>
        ConfigValidator.validate(MySqlVariablesValidation, config),
    }),
  ],
  providers: [ConfigService, MySqlConfigService],
  exports: [MySqlConfigService],
})
export class MySqlConfigModule {}
