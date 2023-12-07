import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProfileInfo } from './profile-info.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  surName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  addressLine: string;

  @Column()
  cityName: string;

  @Column()
  postalCode: string;

  @Column()
  countryName: string;

  @ManyToOne(() => ProfileInfo, profileInfo => profileInfo.customers)
  profileInfo: ProfileInfo;
}