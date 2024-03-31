import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  // whatever is returned from this function will be added to the Request object as the user property
  public validate(email: string, passport: string) {
    try {
      return this.usersService.verifyUser(email, passport);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
