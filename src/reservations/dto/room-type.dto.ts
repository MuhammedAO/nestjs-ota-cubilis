import { IsBoolean, IsNumber } from 'class-validator';

export class RoomTypeDTO {
  @IsBoolean()
  isRoom: boolean;

  @IsNumber()
  roomID: number;
}