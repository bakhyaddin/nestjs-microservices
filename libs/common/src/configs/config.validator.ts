import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export class ConfigValidator {
  public static validate = <T extends object>(
    configClass: new () => T,
    config: Record<string, unknown>,
  ) => {
    const validatedConfig = plainToInstance(configClass, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  };
}
