import { Logger } from './core/logger/logger.js';
import Application from './app/application.js';
import ConfigurationService from './core/configuration/configuration.service.js';


async function bootstrap() {
  const logger = new Logger();
  const configuration = new ConfigurationService(logger);

  const application = new Application(logger, configuration);
  await application.init();
}

bootstrap();
