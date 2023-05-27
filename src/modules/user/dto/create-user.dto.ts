import { User } from "../../../types/user.type";

export default class CreateUserDto implements User { // TODO should name be UserDtoCreator ?
  public avatarPath!: string;
  public email!: string;
  public isPro!: boolean;
  public name!: string;
  public password!: string;
}
