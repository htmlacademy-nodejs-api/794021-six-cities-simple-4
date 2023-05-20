import { inject, injectable } from 'inversify';
import { ConfigurationInterface } from '../core/configuration/configuration.interface.js';
import { ConfigurationOptions } from '../core/configuration/configuration.schema.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ApplicationComponent } from '../types/application-component.enum.js';


@injectable()
export default class Application {
  constructor(
    @inject(ApplicationComponent.LoggerInterface)
      private readonly logger: LoggerInterface,

    @inject(ApplicationComponent.ConfigurationInterface)
      private readonly configuration: ConfigurationInterface<ConfigurationOptions>,
  ) {
  }


  public async init() {
    this.logger.info('Application is starting...');
    this.logger.info(`Incoming TCP port: ${this.configuration.get('INCOMING_TCP_PORT')}`);
  }

}
