import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AuthAppConfigValidator {
  @IsInt()
  @IsNotEmpty()
  HTTP_PORT: number;

  @IsInt()
  @IsNotEmpty()
  TCP_PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsInt()
  @IsNotEmpty()
  JWT_EXPIRATION: number;
}
