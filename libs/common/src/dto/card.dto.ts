import { IsCreditCard, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CardDto {
  @IsInt()
  cvc?: number;

  @IsInt()
  @IsNotEmpty()
  expMonth: number;

  @IsInt()
  @IsNotEmpty()
  expYear: number;

  @IsCreditCard()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  holderName: string;
}
