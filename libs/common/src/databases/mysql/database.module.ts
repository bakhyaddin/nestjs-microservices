import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { MySqlProviderService } from './provider.service';
import { MySqlConfigModule, MySqlConfigService } from '../../configs/databases';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlProviderService,
      inject: [MySqlConfigService],
    }),
  ],
})
export class MySqlModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
