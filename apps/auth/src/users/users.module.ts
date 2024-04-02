import { Module } from '@nestjs/common';

import { MongoDbModule } from '@app/common/databases/mongodb';
import { UserDocument, UserSchema } from '@app/common/models';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    MongoDbModule,
    MongoDbModule.forFeature([{ schema: UserSchema, name: UserDocument.name }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
