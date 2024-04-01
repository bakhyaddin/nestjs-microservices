import { IsEmail, IsNotEmpty } from 'class-validator';

import { CreateChargeDto } from '@app/common/dto';

export class PaymentsCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
