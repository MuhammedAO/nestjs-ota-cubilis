import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { RoomStay } from './entities/room-stay.entity';

import { ReservationDTO } from './dto/reservation.dto';
import { HotelReservation } from './entities/hotel-reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(HotelReservation)
    private reservationRepository: Repository<ReservationDTO>,
    // ... other repository injections for RoomStay, RoomType, RatePlan, GuestCount, Comment
  ) {}

  public async createOrUpdateReservation(reservationDTO: ReservationDTO): Promise<HotelReservation> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      let reservation = await queryRunner.manager.findOne(HotelReservation, {
        where: {
          creatorID: reservationDTO.creatorID,
          createDateTime: reservationDTO.createDateTime,
        },
      });

      if (!reservation) {
        reservation = queryRunner.manager.create(HotelReservation, {
          creatorID: reservationDTO.creatorID,
          createDateTime: reservationDTO.createDateTime,
          resStatus: reservationDTO.resStatus,
        });
      } else {
        // Update logic for existing reservation
        reservation.resStatus = reservationDTO.resStatus;
      }

      reservation = await queryRunner.manager.save(reservation);

      // Now, let's iterate over nested RoomStay DTOs and create or update each RoomStay
      for (const roomStayDTO of reservationDTO.roomStays) {
        let roomStay = await queryRunner.manager.findOne(RoomStay, {
          where: {
            indexNumber: roomStayDTO.indexNumber,
            hotelReservation: { id: reservation.id },
          },
        });

        if (!roomStay) {
          roomStay = queryRunner.manager.create(RoomStay, {
            indexNumber: roomStayDTO.indexNumber,
            hotelReservation: reservation
          });
        } // No else needed - assuming we don't update room stays in this example

        // Directly save RoomStay as we have no updates in this example to existing RoomStays
        roomStay = await queryRunner.manager.save(roomStay);

        // Similar logic would apply for saving RoomTypes, RatePlans, GuestCounts, and Comments
        // For brevity, I'm not repeating that logic for each related entity type
      }

      // If everything has been successful up to this point, commit the transaction
      await queryRunner.commitTransaction();

      return reservation; // Return the saved Reservation entity
    } catch (error) {
      // If we catch any errors, rollback the transaction
      await queryRunner.rollbackTransaction();
      throw new Error(`Transaction failed for reservation: ${error.message}`);
    } finally {
      // Release the query runner which will return it to the pool
      await queryRunner.release();
    }
  }

}
