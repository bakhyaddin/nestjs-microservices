import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { User } from '@app/common/models';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  // we need to inject client proxy
  // with client proxy microservices can talk to each other
  // for each micorservice we have an injections token as a string for each microservice
  // estabslishes communication through the defined tranport layer
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // cookie-parser library is responsible for populating the cookies property in the request object
    const jwt =
      request?.cookies?.Authentication || request?.headers?.authentication;
    if (!jwt) {
      return false;
    }

    const roles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    // authenticate is the message pattern that we have defined in the aut microservice controller
    return (
      this.authClient
        .send<User>('authenticate', {
          Authentication: jwt,
        })
        // piping additional properties in this observable
        .pipe(
          // executing a side affect in the incoming response
          // user returned from the 'authenticate' message pattern in the auth microservice
          // is mapped back to the user property in the request object
          tap((res) => {
            for (const role of roles) {
              if (!res.roles.map((role) => role.name).includes(role)) {
                this.logger.error('The user does not have valid roles');
                throw new UnauthorizedException();
              }
            }

            request.user = res;
          }),
          map(() => true),
          // this is for handling 403 error
          catchError((err) => {
            this.logger.error(err);
            return of(false);
          }),
        )
    );
  }
}
