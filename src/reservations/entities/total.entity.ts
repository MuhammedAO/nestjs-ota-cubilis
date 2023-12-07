import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { RoomStay } from './room-stay.entity';

@Entity()
export class Total {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amountAfterTax: number;

  @OneToOne(() => RoomStay, roomStay => roomStay.total)
  roomStay: RoomStay;
}
