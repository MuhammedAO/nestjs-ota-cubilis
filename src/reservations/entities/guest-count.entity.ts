import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RoomStay } from './room-stay.entity';

@Entity()
export class GuestCount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ageQualifyingCode: number;

  @Column()
  count: number;

  @ManyToOne(() => RoomStay, roomStay => roomStay.guestCounts)
  roomStay: RoomStay;
}