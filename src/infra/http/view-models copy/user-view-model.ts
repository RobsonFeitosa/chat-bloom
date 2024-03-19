import { User } from '@app/entities/user';

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      password: user.password,
    };
  }
}
