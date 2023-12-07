import { Module } from '@nestjs/common';
import { RoomInformationService } from './room-information.service';
import { RoomInformationController } from './room-information.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { RoomType } from './entities/room-type.entity';
import { RatePlan } from './entities/rate-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, RoomType , RatePlan]),],
  controllers: [RoomInformationController],
  providers: [RoomInformationService],
})
export class RoomInformationModule {}
