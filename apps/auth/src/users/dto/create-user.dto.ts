import {
  IsArray,
  IsEmail,
  ValidateNested,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RoleDto } from './role.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => RoleDto)
  roles?: RoleDto[];
}
