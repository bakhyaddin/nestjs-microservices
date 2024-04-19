import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { ReservationsModule } from './apps/reservations/src/reservations.module';
import { MySqlProviderService } from './libs/common/src/databases/mysql/provider.service';

export default (async () => {
  const app = await NestFactory.create(ReservationsModule);

  const postgresDataSource = app
    .get(MySqlProviderService)
    .createTypeOrmOptions();

  // @ts-ignore
  return new DataSource(postgresDataSource);
})();
