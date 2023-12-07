import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdditionalDetailDTO } from './additional-detail.dto';


export class RatePlanDTO {
  @IsDate()
  effectiveDate: Date;

  @IsNumber()
  ratePlanID: number;

  @IsString()
  ratePlanName: string;

  @ValidateNested({ each: true })
  @Type(() => AdditionalDetailDTO)
  additionalDetails: AdditionalDetailDTO[];
}