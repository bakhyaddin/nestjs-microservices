import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { MySqlConfigService } from '@app/common/configs/databases';

@Injectable()
export class MySqlProviderService implements TypeOrmOptionsFactory {
  constructor(private mySqlConfigService: MySqlConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.mySqlConfigService.host,
      port: this.mySqlConfigService.port,
      username: this.mySqlConfigService.user,
      password: this.mySqlConfigService.password,
      database: this.mySqlConfigService.database,
      autoLoadEntities: true,
      synchronize: false,
      logging: this.mySqlConfigService.logging,
      migrations: [`${__dirname}/migrations/*{.ts,.js}`],
      migrationsRun: true,
      entities: [],
    };
  }
}
