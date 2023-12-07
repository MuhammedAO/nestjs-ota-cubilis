import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { RoomStay } from './room-stay.entity';
import { Comment } from './comment.entity';
import { ProfileInfo } from './profile-info.entity';

@Entity()
export class HotelReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createDateTime: Date;

  @Column()
  creatorID: string;

  @Column()
  resStatus: string; // e.g., "New", "Modified", "Cancelled"

  @OneToMany(() => RoomStay, roomStay => roomStay.hotelReservation)
  roomStays: RoomStay[];

  @OneToMany(() => Comment, comment => comment.hotelReservation)
  comments: Comment[];

  @OneToMany(() => ProfileInfo, profileInfo => profileInfo.hotelReservation)
  profileInfos: ProfileInfo[];

}
