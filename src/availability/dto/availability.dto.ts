import { Type } from 'class-transformer';
import { IsArray, IsDate, IsNumber, ValidateNested } from 'class-validator';
import { LengthOfStayDTO } from './length-of-stay.dto';
import { BestAvailableRateDTO } from './best-available-rate.dto';

export class AvailStatusMessageDTO {
  @IsNumber()
  bookingLimit: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @ValidateNested({ each: true })
  @Type(() => LengthOfStayDTO)
  @IsArray()
  lengthsOfStay: LengthOfStayDTO[];

  @ValidateNested({ each: true })
  @Type(() => BestAvailableRateDTO)
  @IsArray()
  bestAvailableRates: BestAvailableRateDTO[];

  // ... other fields like roomType and ratePlanID ...
}
