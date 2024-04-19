import { IsNotEmpty, IsInt } from 'class-validator';

export class GetUserDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
