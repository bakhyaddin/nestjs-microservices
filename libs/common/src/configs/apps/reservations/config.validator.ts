import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReservationsAppCofigValidator {
  @IsInt()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  AUTH_SERVICE_HOST: string;

  @IsInt()
  @IsNotEmpty()
  AUTH_SERVICE_TCP_PORT: number;

  @IsString()
  @IsNotEmpty()
  PAYMENTS_SERVICE_HOST: string;

  @IsInt()
  @IsNotEmpty()
  PAYMENTS_SERVICE_TCP_PORT: number;
}
