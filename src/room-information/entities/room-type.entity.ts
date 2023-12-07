import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Hotel } from './hotel.entity';
import { RatePlan } from './rate-plan.entity';

@Entity()
export class RoomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Hotel, hotel => hotel.roomTypes)
  hotel: Hotel;

  @OneToMany(() => RatePlan, ratePlan => ratePlan.roomType)
  ratePlans: RatePlan[];
}