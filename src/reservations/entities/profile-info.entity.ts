import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { HotelReservation } from './hotel-reservation.entity';
import { Customer } from './customer.entity'; 
@Entity()
export class ProfileInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => HotelReservation, hotelReservation => hotelReservation.profileInfos)
  @JoinColumn()
  hotelReservation: HotelReservation;

  @OneToMany(() => Customer, customer => customer.profileInfo) // Assuming one-to-many relation
  customers: Customer[];
}