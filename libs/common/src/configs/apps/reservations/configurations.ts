import { registerAs } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

export default registerAs(ConfigurationNamespaces.RESERVATIONS_APP, () => ({
  port: process.env.PORT,
  authServiceHost: process.env.AUTH_SERVICE_HOST,
  authServiceTcpPort: process.env.AUTH_SERVICE_TCP_PORT,
}));
