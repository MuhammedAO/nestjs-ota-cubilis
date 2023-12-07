import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { RoomType } from './room-type.entity';

@Entity()
export class RatePlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => RoomType, roomType => roomType.ratePlans)
  roomType: RoomType;
}