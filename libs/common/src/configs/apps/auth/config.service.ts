import { Injectable } from '@nestjs/common';
import { ConfigurationNamespaces } from '../../config.namespace';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthAppConfigService {
  private readonly configurationNamespace = ConfigurationNamespaces.AUTH_APP;

  constructor(private configService: ConfigService) {}

  get httpPort() {
    return this.configService.get(this.configurationNamespace).port;
  }

  get tcpPort() {
    return this.configService.get(this.configurationNamespace).tcpPort;
  }

  get jwtSecret() {
    return this.configService.get(this.configurationNamespace).jwtSecret;
  }

  get jwtExpiration() {
    return this.configService.get(this.configurationNamespace).jwtExpiration;
  }
}
