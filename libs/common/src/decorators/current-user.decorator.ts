import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../models/user.schema';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserDocument =>
    context.switchToHttp().getRequest().user,
);
