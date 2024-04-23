import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { MigrationsModule } from './migrations.module';
import { MySqlProviderService } from '@app/common/databases/mysql';

import { Reservation } from '../../reservations/src/models/reservation.entity';
import { User, Role } from '@app/common/models';

const { CONTEXT } = process.env;

const getEntities = (context: string) => {
  const entities = {
    auth: [User, Role],
    reservations: [Reservation],
  };

  const contextEntities = entities[context];
  if (!contextEntities) {
    throw new Error('Unkown context');
  }
  return contextEntities;
};

export default (async () => {
  const entities = CONTEXT ? getEntities(CONTEXT) : [];

  const app = await NestFactory.create(MigrationsModule);

  const mysqlDataSource = app.get(MySqlProviderService).createTypeOrmOptions();

  const migrationDataSource: TypeOrmModuleOptions = {
    ...mysqlDataSource,
    migrations: [
      `${__dirname}/auth/*{.ts,.js}`,
      `${__dirname}/reservations/*{.ts,.js}`,
    ],
    entities,
  };

  await app.close();

  // @ts-ignore
  return new DataSource(migrationDataSource);
})();
