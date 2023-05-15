type UserType = true | false

export type User = {
  name: string;
  email: string;
  avatarPath: string;
  password: string;
  isPro: UserType;
}
