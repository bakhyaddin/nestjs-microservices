import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';

import { NotificationsAppConfigService } from '@app/common/configs/apps/notifications';

import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  private readonly transporter: Transporter;
  constructor(
    private readonly notificationsAppConfigService: NotificationsAppConfigService,
  ) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.notificationsAppConfigService.smtpUser,
        clientId: this.notificationsAppConfigService.googleOauthClientId,
        clientSecret:
          this.notificationsAppConfigService.googleOauthClientSecret,
        refreshToken:
          this.notificationsAppConfigService.googleOauthRefreshToken,
      },
    });
  }

  async notifyEmail({ email, text }: NotifyEmailDto) {
    return this.transporter.sendMail({
      from: this.notificationsAppConfigService.smtpUser,
      to: email,
      subject: 'Sleepr Notification',
      text,
    });
  }
}
