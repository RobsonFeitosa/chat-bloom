import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Room } from './room';
import { Chat } from './chat';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Room, (room) => room.user)
  rooms: Room[];

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];
}
