import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RatePlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ratePlanID: string; 
