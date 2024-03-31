import { Module } from '@nestjs/common';
import { MongoDbModule } from '@app/common/databases/mongodb';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDocument, UserSchema } from './models/user.schema';
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
