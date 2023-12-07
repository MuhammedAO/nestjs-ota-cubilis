import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { RoomStay } from './room-stay.entity';
import { AdditionalDetail } from './additional-detail.entity';

@Entity()
export class RatePlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  effectiveDate: Date;

  @Column()
  ratePlanID: number;

  @Column()
  ratePlanName: string;

  @ManyToOne(() => RoomStay, roomStay => roomStay.ratePlans)
  roomStay: RoomStay;

  @OneToMany(() => AdditionalDetail, additionalDetail => additionalDetail.ratePlan, { cascade: true })
  additionalDetails: AdditionalDetail[];
}
