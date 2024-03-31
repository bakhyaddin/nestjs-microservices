import { IsInt, IsString } from 'class-validator';

export class AuthAppConfigValidator {
  @IsInt()
  HTTP_PORT: number;

  @IsInt()
  TCP_PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsInt()
  JWT_EXPIRATION: number;
}
