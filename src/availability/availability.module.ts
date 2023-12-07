import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityStatus } from './entities/availability-status.entity';
import { BestAvailableRate } from './entities/best-available-rate.entity';
import { LengthOfStay } from './entities/length-of-stay.entity';
import { RatePlan } from './entities/rate-plan.entity';
import { RoomType } from './entities/room-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvailabilityStatus, BestAvailableRate , LengthOfStay, RatePlan, RoomType]),],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}
