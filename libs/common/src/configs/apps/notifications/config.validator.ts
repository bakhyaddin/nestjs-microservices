import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class NotificationsAppConfigValidator {
  @IsInt()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  GOOGLE_OAUTH_CLIENT_ID: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_OAUTH_CLIENT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  GOOGLE_OAUTH_REFRESH_TOKEN: string;

  @IsEmail()
  @IsNotEmpty()
  SMTP_USER: string;
}
