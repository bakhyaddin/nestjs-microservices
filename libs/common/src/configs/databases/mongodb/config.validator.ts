import { IsString } from 'class-validator';

export class MongoDbVariablesValidation {
  @IsString()
  MONGODB_URI: string;
}
