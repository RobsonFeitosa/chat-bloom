import { CreateChat } from '@app/use-cases/chats/create-chat';
import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

interface Message {
  msg: string;
  user: {
    id: string;
    name: string;
  };
  room_id: number;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private createChat: CreateChat) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: Message) {
    this.server.emit('onMessage', {
      msg: 'New Message',
      content: body,
    });

    this.saveChat(body);
  }

  private async saveChat(message: Message) {
    await this.createChat.execute({
      message: message.msg,
      room_id: message.room_id,
      user_id: message.user.id,
    });
  }
}
