import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AvailabilityStatus } from './availability-status.entity';

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invCode: string; 

  // One RoomType can have many availability status messages.
  @OneToMany(() => AvailabilityStatus, (availStatusMessage) => availStatusMessage.roomType)
  availStatusMessages: AvailabilityStatus[];
}
