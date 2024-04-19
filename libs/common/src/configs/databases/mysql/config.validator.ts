import { IsNotEmpty, IsString } from 'class-validator';

export class MySqlVariablesValidation {
  @IsString()
  @IsNotEmpty()
  MONGODB_URI: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_HOST: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_POST: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_DATABASE: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  MYSQL_PASSWORD: string;
}
