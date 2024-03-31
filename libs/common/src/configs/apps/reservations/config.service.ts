import { Injectable } from '@nestjs/common';

import { ConfigurationNamespaces } from '../../config.namespace';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationsAppConfigService {
  private readonly configurationNamespace =
    ConfigurationNamespaces.RESERVATIONS_APP;

  constructor(private configService: ConfigService) {}

  get port() {
    return this.configService.get(this.configurationNamespace).port;
  }

  get authServiceHost() {
    return this.configService.get(this.configurationNamespace).authServiceHost;
  }

  get authServiceTcpPort() {
    return this.configService.get(this.configurationNamespace)
      .authServiceTcpPort;
  }

  get paymentsServiceHost() {
    return this.configService.get(this.configurationNamespace)
      .paymentsServiceHost;
  }

  get paymentsServiceTcpPort() {
    return this.configService.get(this.configurationNamespace)
      .paymentsServiceTcpPort;
  }
}
