import { registerAs } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

export default registerAs(ConfigurationNamespaces.PAYMENTS_APP, () => ({
  port: process.env.PORT,
  notificationsServiceHost: process.env.NOTIFICATIONS_SERVICE_HOST,
  notificationsServicePort: process.env.NOTIFICATIONS_SERVICE_PORT,
}));
