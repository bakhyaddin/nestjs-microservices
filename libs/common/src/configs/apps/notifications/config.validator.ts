import { IsInt, IsNotEmpty } from 'class-validator';

export class NotificationsAppConfigValidator {
  @IsInt()
  @IsNotEmpty()
  PORT: number;
}
