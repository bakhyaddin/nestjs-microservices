import { IsInt, IsNotEmpty } from 'class-validator';

export class PaymentsAppCofigValidator {
  @IsInt()
  @IsNotEmpty()
  PORT: number;
}
