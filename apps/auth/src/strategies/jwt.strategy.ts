import { AuthAppConfigService } from '@app/common/configs/apps/auth';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

// this is basically verifying the JWT
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    public readonly authAppConfigService: AuthAppConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // we whether extract the token from the cookies
        // or in the request object. this happens when a microservoce sends a request
        // this is done intentially.
        // this request can be from express or an RPC call
        (request: any) =>
          request?.cookies?.Authentication ||
          request?.Authentication ||
          request?.headers?.Authentication,
      ]),
      secretOrKey: authAppConfigService.jwtSecret,
    });
  }

  // token payload is passed here

  // whatever is returned from the method will be populated as the user property in the request object
  public async validate({ userId }: TokenPayload) {
    // populates the user object in the request object
    return this.usersService.getUser({ id: userId });
  }
}
