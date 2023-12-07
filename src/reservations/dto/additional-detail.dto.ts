import { IsDecimal } from 'class-validator';

export class AdditionalDetailDTO {
  @IsDecimal()
  amount: number;
}
