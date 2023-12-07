import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RoomStay } from './room-stay.entity';

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isRoom: boolean;

  @Column()
  roomID: number;

  @ManyToOne(() => RoomStay, roomStay => roomStay.roomTypes)
  roomStay: RoomStay;
}