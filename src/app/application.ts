import { inject, injectable } from 'inversify';
import { ConfigurationInterface } from '../core/configuration/configuration.interface.js';
import { ConfigurationOptions } from '../core/configuration/configuration.schema.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import { getDatabaseURI } from '../core/helpers/database.js';
import { ApplicationComponent } from '../types/application-component.enum.js';


@injectable()
export default class Application {
  constructor(
    @inject(ApplicationComponent.LoggerInterface)
      private readonly logger: LoggerInterface,

    @inject(ApplicationComponent.ConfigurationInterface)
      private readonly configuration: ConfigurationInterface<ConfigurationOptions>,

    @inject(ApplicationComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
  ) {
  }


    private async _initDb() {
      const dbUri = getDatabaseURI(
        this.configuration.get('DB_ADDRESS'),
        this.configuration.get('DB_PORT'),
        this.configuration.get('DB_LOGIN'), 
        this.configuration.get('DB_PASSWORD'),
        this.configuration.get('DB_NAME'),
      )

      return this.databaseClient.connect(dbUri);
    }


  public async init() {
    this.logger.info('Application is starting...');
    this.logger.info(`Incoming TCP port: ${this.configuration.get('INCOMING_TCP_PORT')}`);

    this.logger.info('Database is starting...');
    await this._initDb()
    this.logger.info('Database initialization completed.');
  }

}
