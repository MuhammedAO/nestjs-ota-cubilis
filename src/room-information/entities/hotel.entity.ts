import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoomType } from './room-type.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ unique: true })
  code: string; 

  @Column('text')
  description: string;

  @OneToMany(() => RoomType, roomType => roomType.hotel)
  roomTypes: RoomType[];
}