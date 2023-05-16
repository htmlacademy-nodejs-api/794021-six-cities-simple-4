import { config } from 'dotenv';
import { ConfigurationInterface } from './configuration.interface.js';
import { ApplicationConfigurationSchema, ApplicationSchema } from './application.schema.js';
import { LoggerInterface } from '../logger/logger.interface.js';


export default class ConfigurationService implements ConfigurationInterface<ApplicationSchema> {
  private readonly config: ApplicationSchema;


  constructor(
    private readonly logger: LoggerInterface,
  ) {
    const parsedConfigOutput = config();

    if (parsedConfigOutput.error) {
      throw new Error('Could not read file ".env". Perhaps the file does not exist.');
    }

    ApplicationConfigurationSchema.load({});
    ApplicationConfigurationSchema.validate({
      allowed: 'strict',
      output: this.logger.info,
    });

    this.config = ApplicationConfigurationSchema.getProperties();
    this.logger.info('".env: file found and successfully parsed.');
  }


  public get<T extends keyof ApplicationSchema>(key: T): ApplicationSchema[T] {
    return this.config[key];
  }

}
