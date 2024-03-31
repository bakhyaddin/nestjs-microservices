import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

@Injectable()
export class MongoDbConfigService {
  private readonly configurationNamespace = ConfigurationNamespaces.MONGO_DB;

  constructor(private configService: ConfigService) {}

  get uri(): string {
    return this.configService.get(this.configurationNamespace).uri;
  }
}
