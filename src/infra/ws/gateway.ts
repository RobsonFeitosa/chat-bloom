import { CreateChat } from '@app/use-cases/chats/create-chat';
import { Logger, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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

  private readonly logger = new Logger(ChatGateway.name);

  constructor(private createChat: CreateChat) {}

  onModuleInit() {
    this.server.on('connection', (socket) => this.handleConnection(socket));
  }

  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() body: Message) {
    try {
      await this.handleNewMessage(body);
      console.log({ body });
    } catch (error: any) {
      this.logger.error(`Error processing new message: ${error.message}`);
    }
  }

  private async handleConnection(socket: Socket) {
    this.logger.log(`Client connected: ${socket.id}`);
  }

  private async saveChat(message: Message) {
    await this.createChat.execute({
      message: message.msg,
      room_id: message.room_id,
      user_id: message.user.id,
    });

    this.logger.log('Message saved successfully');
  }

  private async handleNewMessage(message: Message) {
    this.logger.log(`Received new message from user ${message.user.id}`);

    this.server.emit('onMessage', {
      msg: 'New Message',
      content: message,
    });

    await this.saveChat(message);
  }
}
