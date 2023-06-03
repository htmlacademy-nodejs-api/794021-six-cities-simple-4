import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { UserServiceInterface } from './user-service.interface.js';
import UserService from './user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';


export function createUserContainer() {
  const container = new Container();

  container.
    bind<UserServiceInterface>(ApplicationComponent.UserServiceInterface).
    to(UserService).
    inSingletonScope();

  container.
    bind<types.ModelType<UserEntity>>(ApplicationComponent.UserModel).
    toConstantValue(UserModel);

  return container;
}
