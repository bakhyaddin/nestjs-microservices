import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

@Injectable()
export class NotificationsAppConfigService {
  private readonly configurationNamespace =
    ConfigurationNamespaces.NOTIFICATIONS_APP;

  constructor(private readonly configService: ConfigService) {}

  get port() {
    return this.configService.get(this.configurationNamespace).port;
  }

  get googleOauthClientId() {
    return this.configService.get(this.configurationNamespace)
      .googleOauthClientId;
  }

  get googleOauthClientSecret() {
    return this.configService.get(this.configurationNamespace)
      .googleOauthClientSecret;
  }

  get googleOauthRefreshToken() {
    return this.configService.get(this.configurationNamespace)
      .googleOauthRefreshToken;
  }

  get smtpUser() {
    return this.configService.get(this.configurationNamespace).smtpUser;
  }
}
