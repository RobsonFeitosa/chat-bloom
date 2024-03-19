import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/users.controllers';
import { CreateUser } from '@app/use-cases/create-user';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUser],
})
export class HttpModule {}
