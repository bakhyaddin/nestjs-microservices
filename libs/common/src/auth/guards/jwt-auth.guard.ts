import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '@app/common/dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  // we need to inject client proxy
  // with client proxy microservices can talk to each other
  // for each micorservice we have an injections token as a string for each microservice
  // estabslishes communication through the defined tranport layer
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

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
    // authenticate is the message pattern that we have defined in the aut microservice controller
    return (
      this.authClient
        .send<UserDto>('authenticate', {
          Authentication: jwt,
        })
        // piping additional properties in this observable
        .pipe(
          // executing a side affect in the incoming response
          // user returned from the 'authenticate' message pattern in the auth microservice
          // is mapped back to the user property in the request object
          tap((res) => {
            request.user = res;
          }),
          map(() => true),
          // this is for handling 403 error
          catchError(() => of(false)),
        )
    );
  }
}
