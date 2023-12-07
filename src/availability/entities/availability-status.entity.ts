import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RoomType } from './room-type.entity';
import { LengthOfStay } from './length-of-stay.entity';
import { BestAvailableRate } from './best-available-rate.entity';
import { RatePlan } from './rate-plan.entity';

@Entity()
export class AvailabilityStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookingLimit: number;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @ManyToOne(() => RoomType, roomType => roomType.availStatusMessages)
  @JoinColumn({ name: 'roomTypeId' })
  roomType: RoomType;

  @ManyToOne(() => RatePlan)
  @JoinColumn({ name: 'ratePlanId' }) // Create a foreign key column 'ratePlanId' in 'avail_status_message' table
  ratePlan: RatePlan;

  @OneToMany(() => LengthOfStay, lengthOfStay => lengthOfStay.availStatusMessage)
  lengthsOfStay: LengthOfStay[];

  @OneToMany(() => BestAvailableRate, bestAvailableRate => bestAvailableRate.availStatusMessage)
  bestAvailableRates: BestAvailableRate[];
}
