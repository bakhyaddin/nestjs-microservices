import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { HealthModule, LoggerModule } from '@app/common';
import {
  AuthAppConfigModule,
  AuthAppConfigService,
} from '@app/common/configs/apps/auth';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    AuthAppConfigModule,
    LoggerModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (authAppConfigService: AuthAppConfigService) => ({
        secret: authAppConfigService.jwtSecret,
        signOptions: {
          expiresIn: `${authAppConfigService.jwtExpiration}s`,
        },
      }),
      inject: [AuthAppConfigService],
      imports: [AuthAppConfigModule],
    }),
    HealthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthAppConfigService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
