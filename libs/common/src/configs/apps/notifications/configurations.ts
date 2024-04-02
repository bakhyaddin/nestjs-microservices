import { registerAs } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

export default registerAs(ConfigurationNamespaces.NOTIFICATIONS_APP, () => ({
  port: process.env.PORT,
  googleOauthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleOauthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  googleOauthRefreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
  smtpUser: process.env.SMTP_USER,
}));
