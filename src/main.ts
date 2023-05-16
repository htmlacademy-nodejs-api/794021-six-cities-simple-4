import { Logger } from './core/logger/logger.js';
import Application from './app/application.js';


async function bootstrap() {
  const logger = new Logger();

  const application = new Application(logger);

  await application.init();
}

bootstrap();
