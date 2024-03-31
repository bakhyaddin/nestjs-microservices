import { IsNotEmpty, IsString } from 'class-validator';

export class MongoDbVariablesValidation {
  @IsString()
  @IsNotEmpty()
  MONGODB_URI: string;
}
