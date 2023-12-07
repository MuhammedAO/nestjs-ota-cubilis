import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationDTO } from './dto/reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(@Body() reservationDTO: ReservationDTO) {
    try {
      const reservation = await this.reservationsService.createOrUpdateReservation(reservationDTO);
      return reservation; // For now, i'm returning the entity directly for simplicity
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
