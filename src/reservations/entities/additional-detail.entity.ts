import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RatePlan } from './rate-plan.entity';

@Entity()
export class AdditionalDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => RatePlan, ratePlan => ratePlan.additionalDetails)
  ratePlan: RatePlan;
}