import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';

interface CreateUserRequest {
  name: string;
  password: string;
  email: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private typeormUsersRepository: TypeormUsersRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, password, email } = request;

    const user = new User();

    user.id = 'asfas';
    user.name = name;
    user.password = password;
    user.email = email;

    await this.typeormUsersRepository.create(user);

    return { user };
  }
}
