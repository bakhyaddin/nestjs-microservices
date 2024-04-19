import { Module } from '@nestjs/common';

import { MySqlModule } from '@app/common/databases/mysql';
import { Role, User } from '@app/common/models';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [MySqlModule, MySqlModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
