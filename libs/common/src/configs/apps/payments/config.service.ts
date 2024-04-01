import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

@Injectable()
export class PaymentsAppConfigService {
  private readonly configurationNamespace =
    ConfigurationNamespaces.PAYMENTS_APP;

  constructor(private readonly configService: ConfigService) {}

  get port() {
    return this.configService.get(this.configurationNamespace).port;
  }

  get notificationsServiceHost() {
    return this.configService.get(this.configurationNamespace)
      .notificationsServiceHost;
  }

  get notificationsServicePort() {
    return this.configService.get(this.configurationNamespace)
      .notificationsServicePort;
  }
}
