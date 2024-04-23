import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { MongoDbConfigService } from '@app/common/configs/databases/mongodb';

@Injectable()
export class MongoDbProviderService implements MongooseOptionsFactory {
  constructor(private readonly mongoDbConfigService: MongoDbConfigService) {}

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.mongoDbConfigService.uri,
    };
  }
}
