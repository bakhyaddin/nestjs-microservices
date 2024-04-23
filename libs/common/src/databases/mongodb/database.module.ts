import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

import {
  MongoDbConfigService,
  MongoDbConfigModule,
} from '@app/common/configs/databases/mongodb';
import { MongoDbProviderService } from './provider.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoDbConfigModule],
      useClass: MongoDbProviderService,
      inject: [MongoDbConfigService],
    }),
  ],
})
export class MongoDbModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
