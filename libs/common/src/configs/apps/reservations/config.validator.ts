import { IsInt, IsString } from 'class-validator';

export class ReservationsAppCofigValidator {
  @IsInt()
  PORT: number;

  @IsString()
  AUTH_SERVICE_HOST: string;

  @IsInt()
  AUTH_SERVICE_TCP_PORT: number;
}
