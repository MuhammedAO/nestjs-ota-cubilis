import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomerDTO } from './customer.dto';


export class ProfileInfoDTO {
  @ValidateNested()
  @Type(() => CustomerDTO)
  customers: CustomerDTO[];
}