import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import OfferService from './offer.service.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';


export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.
    bind<OfferServiceInterface>(ApplicationComponent.OfferServiceInterface).
    to(OfferService).
    inSingletonScope();

  offerContainer.
    bind<types.ModelType<OfferEntity>>(ApplicationComponent.OfferModel).
    toConstantValue(OfferModel);

  return offerContainer;
}
