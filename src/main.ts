import 'reflect-metadata';
import { Container } from 'inversify';
import Application from './app/application.js';
import { LoggerService } from './core/logger/logger.service.js';
import { LoggerInterface } from './core/logger/logger.interface.js';
import ConfigurationService from './core/configuration/configuration.service.js';
import { ConfigurationInterface } from './core/configuration/configuration.interface.js';
import { ConfigurationOptions } from './core/configuration/configuration.schema.js';
import { ApplicationComponent } from './types/application-component.enum.js';
import { DatabaseClientInterface } from './core/database-client/database-client.interface.js';
import { DatabaseClientService } from './core/database-client/database-client.service.js';


async function bootstrap() {
  const container = new Container();
  container.bind<Application>(ApplicationComponent.Application).
    to(Application).
    inSingletonScope();

  container.bind<ConfigurationInterface<ConfigurationOptions>>(ApplicationComponent.ConfigurationInterface).
    to(ConfigurationService).
    inSingletonScope();

  container.bind<DatabaseClientInterface>(ApplicationComponent.DatabaseClientInterface).
    to(DatabaseClientService).
    inSingletonScope();

  container.bind<LoggerInterface>(ApplicationComponent.LoggerInterface).
    to(LoggerService).
    inSingletonScope();

  const application = container.get<Application>(ApplicationComponent.Application);
  await application.init();
}

bootstrap();
