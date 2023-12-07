import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BestAvailableRateDTO {
  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  ratePlanCode?: string;
}