import { IsNumber } from 'class-validator';

export class GuestCountDTO {
  @IsNumber()
  ageQualifyingCode: number;

  @IsNumber()
  count: number;
}