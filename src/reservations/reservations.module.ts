import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalDetail } from './entities/additional-detail.entity';
import { Comment } from './entities/comment.entity';
import { Customer } from './entities/customer.entity';
import { Guarantee } from './entities/guarantee.entity';
import { GuestCount } from './entities/guest-count.entity';
import { HotelReservation } from './entities/hotel-reservation.entity';
import { ProfileInfo } from './entities/profile-info.entity';
import { RatePlan } from './entities/rate-plan.entity';
import { RoomStay } from './entities/room-stay.entity';
import { RoomType } from './entities/room-type.entity';
import { Total } from './entities/total.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdditionalDetail,
      Comment,
      Customer,
      Guarantee,
      GuestCount,
      HotelReservation,
      ProfileInfo,
      RatePlan,
      RoomStay,
      RoomType,
      Total,
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
