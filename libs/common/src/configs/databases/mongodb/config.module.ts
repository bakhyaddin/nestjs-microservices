import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongoDbVariablesValidation } from './config.validator';
import { MongoDbConfigService } from './config.service';
import { ConfigValidator } from '../../config.validator';
import configurations from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
      validate: (config) =>
        ConfigValidator.validate(MongoDbVariablesValidation, config),
    }),
  ],
  providers: [MongoDbConfigService],
  exports: [MongoDbConfigService],
})
export class MongoDbConfigModule {}
