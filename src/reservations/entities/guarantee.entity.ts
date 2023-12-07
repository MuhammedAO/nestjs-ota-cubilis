import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { HotelReservation } from './hotel-reservation.entity';

@Entity()
export class Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardCode: string;

  @Column()
  cardNumber: string;

  @Column()
  seriesCode: string;

  @Column()
  expireDate: string;

  @Column()
  cardHolderName: string;

  @OneToOne(() => HotelReservation) // Assuming one-to-one for simplicity
  @JoinColumn()
  hotelReservation: HotelReservation;
}