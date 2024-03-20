import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway';
import { CreateChat } from '@app/use-cases/chats/create-chat';
import { TypeOrmService } from '@infra/database/typeorm/typeorm.service';
import { TypeormChatsRepository } from '@infra/database/typeorm/repositories/typeorm-chats-repository';
import { TypeormUsersRepository } from '@infra/database/typeorm/repositories/typeorm-users-repository';
import { TypeormRoomsRepository } from '@infra/database/typeorm/repositories/typeorm-rooms-repository';

@Module({
  providers: [
    ChatGateway,
    TypeOrmService,
    TypeormChatsRepository,
    TypeormUsersRepository,
    TypeormRoomsRepository,
    CreateChat,
  ],
})
export class GatewayModule {}
