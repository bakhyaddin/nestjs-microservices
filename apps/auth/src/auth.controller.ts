import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CurrentUser } from '@app/common/decorators';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/user.schema';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    // we did it in order to be able to send back the JWT token in a cookie
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  // receives RPC calls in the chosen transport layer
  @MessagePattern('authenticate')
  async authenticate(@CurrentUser() user: UserDocument) {
    return user;
  }
}
