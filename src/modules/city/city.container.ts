import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CityServiceInterface } from './city-service.interface.js';
import CityService from './city.service.js';
import { CityEntity, CityModel } from './city.entity.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';


export function createCityContainer() {
  const cityContainer = new Container();

  cityContainer
    .bind<CityServiceInterface>(ApplicationComponent.CityServiceInterface)
    .to(CityService)
    .inSingletonScope();

  cityContainer
    .bind<types.ModelType<CityEntity>>(ApplicationComponent.CityModel)
    .toConstantValue(CityModel);

  return cityContainer;
}
