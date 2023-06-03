import 'reflect-metadata';
import { Container } from 'inversify';
import Application from './app/application.js';
import { createApplicationContainer } from './app/application.container.js';
import { ApplicationComponent } from './types/application-component.enum.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createOfferContainer } from './modules/offer/offer.container.js';


async function bootstrap() {
  const applicationContainer = Container.merge(
    createApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
  );

  const application = applicationContainer.get<Application>(ApplicationComponent.Application);
  await application.init();
}

bootstrap();
