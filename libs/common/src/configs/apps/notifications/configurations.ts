import { registerAs } from '@nestjs/config';

import { ConfigurationNamespaces } from '../../config.namespace';

export default registerAs(ConfigurationNamespaces.NOTIFICATIONS_APP, () => ({
  port: process.env.PORT,
}));
