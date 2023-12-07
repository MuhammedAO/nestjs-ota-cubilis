import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AvailabilityStatus } from './availability-status.entity';

@Entity()
export class BestAvailableRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  ratePlanCode: string; 

  @ManyToOne(() => AvailabilityStatus, availStatusMessage => availStatusMessage.bestAvailableRates)
  availStatusMessage: AvailabilityStatus;
}
