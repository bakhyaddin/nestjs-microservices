import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

@Injectable()
export class MySqlConfigService {
  private readonly configurationNamespace = ConfigurationNamespaces.MYSQL;

  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get(this.configurationNamespace).host;
  }

  get database(): string {
    return this.configService.get(this.configurationNamespace).name;
  }

  get user(): string {
    return this.configService.get(this.configurationNamespace).user;
  }

  get password(): string {
    return this.configService.get(this.configurationNamespace).password;
  }

  get port(): number {
    return Number(this.configService.get(this.configurationNamespace).port);
  }

  get logging(): boolean {
    return this.configService.get(this.configurationNamespace).logging;
  }
}
