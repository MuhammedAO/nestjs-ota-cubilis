import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { HotelReservation } from './hotel-reservation.entity';
import { RoomStay } from './room-stay.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @ManyToOne(() => HotelReservation, hotelReservation => hotelReservation.comments, { nullable: true })
  hotelReservation: HotelReservation;

  @ManyToOne(() => RoomStay, roomStay => roomStay.comments, { nullable: true })
  roomStay: RoomStay;
}
