import ConfigurationService from '../core/configuration/configuration.service.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';

export default class Application {
  constructor(
    private readonly logger: LoggerInterface
  ) {
  }


  public async init() {
    this.logger.info('Application initialized.');
    const configuration = new ConfigurationService(this.logger);
    console.log(configuration.get('INCOMING_TCP_PORT'));
  }

}
