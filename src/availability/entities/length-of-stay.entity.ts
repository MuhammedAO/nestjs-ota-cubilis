import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AvailabilityStatus } from './availability-status.entity';

@Entity()
export class LengthOfStay {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: number;

  @Column()
  minMaxMessageType: string; 

  @ManyToOne(() => AvailabilityStatus, availStatusMessage => availStatusMessage.lengthsOfStay)
  availStatusMessage: AvailabilityStatus;
}
