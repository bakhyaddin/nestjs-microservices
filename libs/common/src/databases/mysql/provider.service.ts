import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { MySqlConfigService } from '@app/common/configs/databases/mysql';

@Injectable()
export class MySqlProviderService implements TypeOrmOptionsFactory {
  constructor(private readonly mySqlConfigService: MySqlConfigService) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.mySqlConfigService.host,
      port: this.mySqlConfigService.port,
      username: this.mySqlConfigService.user,
      password: this.mySqlConfigService.password,
      database: this.mySqlConfigService.database,
      logging: this.mySqlConfigService.logging,
      synchronize: false,
    };
  }
}
