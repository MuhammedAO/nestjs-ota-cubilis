import { IsNumber, IsString } from 'class-validator';

export class LengthOfStayDTO {
  @IsString()
  minMaxMessageType: string;

  @IsNumber()
  time: number;
}
