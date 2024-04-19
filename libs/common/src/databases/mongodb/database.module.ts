import { Module } from '@nestjs/common';
import {
  ModelDefinition,
  MongooseModule,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import {
  MongoDbConfigService,
  MongoDbConfigModule,
} from '../../configs/databases';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoDbConfigModule],
      useFactory: (configService: MongoDbConfigService) => {
        return {
          uri: configService.uri,
        };
      },
      inject: [MongoDbConfigService],
    }),
  ],
})
export class MongoDbModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
