import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import { DocumentType } from '@typegoose/typegoose/lib/types.js';
import { UserEntity } from './user.entity.js';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';


@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(ApplicationComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {
  }


  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const userService = this.userModel.create(user);
    this.logger.info(`User created: "${user.email}"`);
    return userService;
  }


  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }


  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ id: userId });
  }


  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

}
