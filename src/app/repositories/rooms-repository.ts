import { Room } from '@app/entities/room';

export abstract class RoomsRepository {
  abstract create(room: Room): Promise<void>;
  abstract findById(id: number): Promise<Room | null>;
  abstract findByUser(user_id: string): Promise<Room[]>;
  abstract findAll(): Promise<Room[]>;
}
