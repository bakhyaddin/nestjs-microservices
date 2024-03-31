import { registerAs } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

export default registerAs(ConfigurationNamespaces.AUTH_APP, () => ({
  port: process.env.HTTP_PORT,
  tcpPort: process.env.TCP_PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
}));
