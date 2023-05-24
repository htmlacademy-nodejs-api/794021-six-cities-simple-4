import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { User } from '../../types/user.type.js';

const { prop } = typegoose;

export interface UserEntity extends defaultClasses.Base {
}

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: false, default: '' })
  public avatarPath = '';

  @prop({ unique: true, required: true })
  public email = '';

  @prop({ required: true })
  public name = '';

  @prop({ required: true })
  public isPro = false;

  @prop({ required: true })
  public password = '';
}

export const UserModel = getModelForClass(UserEntity);
