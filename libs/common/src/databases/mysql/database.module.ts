import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import {
  MySqlConfigModule,
  MySqlConfigService,
} from '@app/common/configs/databases/mysql';
import { MySqlProviderService } from './provider.service';

@Module({
  imports: [
    MySqlConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlProviderService,
      inject: [MySqlConfigService],
    }),
  ],
  providers: [ConfigService, MySqlConfigService, MySqlProviderService],
  exports: [MySqlConfigService, MySqlProviderService],
})
export class MySqlModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
