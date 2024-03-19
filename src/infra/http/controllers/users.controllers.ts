import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from '../dtos/create-user-body';
import { CreateUser } from 'src/app/use-cases/create-user';
import { UserViewModel } from '../view-models copy/user-view-model';
// import { CancelNotification } from '@app/use-cases/cancel-notification';
// import { ReadNotification } from '@app/use-cases/read-notification';
// import { UnreadNotification } from '@app/use-cases/unread-notification';
// import { CountRecipientNotifications } from '@app/use-cases/count-recipient-notifications';
// import { GetRecipientNotifications } from '@app/use-cases/get-recipient-notification';

@Controller('users')
export class UsersController {
  constructor(private createUser: CreateUser) {} // private getRecipientNotifications: GetRecipientNotifications, // private countRecipientNotifications: CountRecipientNotifications, // private unreadNotification: UnreadNotification, // private readNotification: ReadNotification, // private cancelNotification: CancelNotification, // private sendNotification: SendNotification,

  // @Patch(':id/cancel')
  // async cancel(@Param('id') id: string) {
  //   await this.cancelNotification.execute({
  //     notificationId: id,
  //   });
  // }

  // @Get('count/from/:recipientId')
  // async countFromRecipient(@Param('recipientId') recipientId: string) {
  //   const { count } = await this.countRecipientNotifications.execute({
  //     recipientId,
  //   });

  //   return { count };
  // }

  // @Get('from/:recipientId')
  // async getFromRecipient(@Param('recipientId') recipientId: string) {
  //   const { notifications } = await this.getRecipientNotifications.execute({
  //     recipientId,
  //   });

  //   return { notifications: notifications.map(NotificationViewModel.toHttp) };
  // }

  // @Patch(':id/read')
  // async read(@Param('id') id: string) {
  //   await this.readNotification.execute({
  //     notificationId: id,
  //   });
  // }

  // @Patch(':id/unread')
  // async unread(@Param('id') id: string) {
  //   await this.unreadNotification.execute({
  //     notificationId: id,
  //   });
  // }

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, password, email } = body;

    const { user } = await this.createUser.execute({
      name,
      password,
      email,
    });

    return { user: UserViewModel.toHttp(user) };
  }
}
