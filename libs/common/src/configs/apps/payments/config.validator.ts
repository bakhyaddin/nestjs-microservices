import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class PaymentsAppCofigValidator {
  @IsInt()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  NOTIFICATIONS_SERVICE_HOST: string;

  @IsInt()
  @IsNotEmpty()
  NOTIFICATIONS_SERVICE_PORT: number;
}
