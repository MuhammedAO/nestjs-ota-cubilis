import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { HotelReservation } from './hotel-reservation.entity';
import { RoomType } from './room-type.entity';
import { RatePlan } from './rate-plan.entity';
import { GuestCount } from './guest-count.entity';
import { Comment } from './comment.entity';
import { Total } from './total.entity'; 

@Entity()
export class RoomStay {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HotelReservation, hotelReservation => hotelReservation.roomStays)
  hotelReservation: HotelReservation;

  @Column()
  indexNumber: number;

  @OneToMany(() => RoomType, roomType => roomType.roomStay, { cascade: true })
  roomTypes: RoomType[];

  @OneToMany(() => RatePlan, ratePlan => ratePlan.roomStay, { cascade: true })
  ratePlans: RatePlan[];

  @OneToMany(() => GuestCount, guestCount => guestCount.roomStay, { cascade: true })
  guestCounts: GuestCount[];

  @OneToMany(() => Comment, comment => comment.roomStay, { cascade: true })
  comments: Comment[];

  @OneToOne(() => Total, total => total.roomStay, { cascade: true })
  @JoinColumn()
  total: Total; // Total charge for the RoomStay
}
