import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/common';

import { MySqlModule, MySqlProviderService } from '@app/common/databases/mysql';

@Module({
  imports: [MySqlModule, LoggerModule],
  providers: [MySqlProviderService],
})
export class MigrationsModule {}
