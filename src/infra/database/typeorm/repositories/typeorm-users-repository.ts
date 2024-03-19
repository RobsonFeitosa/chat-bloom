import { User } from '@app/entities/user';
import { UsersRepository } from '@app/repositories/users-repository';
import { Injectable } from '@nestjs/common';
import { TypeOrmService } from '../typeorm.service';

@Injectable()
export class TypeormUsersRepository implements UsersRepository {
  constructor(private typeorm: TypeOrmService) {}

  async create(user: User): Promise<void> {
    this.typeorm.getEntityManager().save(user);
  }
}
