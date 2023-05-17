import { ConfigurationInterface } from '../core/configuration/configuration.interface.js';
import { ConfigurationOptions } from '../core/configuration/configuration.schema.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';

export default class Application {
  constructor(
    private readonly logger: LoggerInterface,
    private readonly configuration: ConfigurationInterface<ConfigurationOptions>,
  ) {
  }


  public async init() {
    this.logger.info('Application initialized.');
    this.logger.info(`Incoming TCP port: ${this.configuration.get('INCOMING_TCP_PORT')}`);
  }

}
