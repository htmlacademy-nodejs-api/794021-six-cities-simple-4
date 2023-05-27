import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { createPasswordHash, isEmailValid } from '../../core/helpers/index.js';
import { UserName } from '../../consts/users.js';
import { User } from '../../types/user.type.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    default: '',
    required: false,
    type: String,
  })
  public avatarPath = '';

  @prop({
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: isEmailValid,
      message: 'Email is not valid.',
    },
  })
  public email = '';

  @prop({
    default: '',
    maxLength: UserName.maxLength,
    minLength: UserName.minLength,
    required: true,
    type: String,
  })
  public name = '';

  @prop({
    default: false,
    required: true,
    type: Boolean,
  })
  public isPro = false;

  @prop({
    default: '',
    required: true,
    type: String,
  })
  public password = '';


  constructor(userData: User) {
    super();

    this.avatarPath = userData.avatarPath;
    this.email = userData.email;
    this.isPro = userData.isPro;
    this.name = userData.name;
  }


  public setPassword(password: string, salt: string) {
    this.password = createPasswordHash(password, salt);
  }


  public getPassword() {
    return this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
