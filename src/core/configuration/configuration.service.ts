import { config } from 'dotenv';
import { inject, injectable } from 'inversify';
import { ConfigurationInterface } from './configuration.interface.js';
import { ConfigurationSchema, ConfigurationOptions } from './configuration.schema.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';

@injectable()
export default class ConfigurationService implements ConfigurationInterface<ConfigurationOptions> {
  private readonly config: ConfigurationOptions;


  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ) {
    const parsedConfigOutput = config();

    if (parsedConfigOutput.error) {
      throw new Error('Could not read file ".env". Perhaps the file does not exist.');
    }

    ConfigurationSchema.load({});
    ConfigurationSchema.validate({
      allowed: 'strict',
      output: this.logger.info,
    });

    this.config = ConfigurationSchema.getProperties();
    this.logger.info('".env" file found and successfully parsed.');
  }


  public get<T extends keyof ConfigurationOptions>(key: T): ConfigurationOptions[T] {
    return this.config[key];
  }

}
