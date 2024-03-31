import { AuthAppConfigService } from '@app/common/configs/apps/auth';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { UserDocument } from './users/models/user.schema';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authAppConfigService: AuthAppConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const tokePayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.authAppConfigService.jwtExpiration,
    );

    const token = this.jwtService.sign(tokePayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
