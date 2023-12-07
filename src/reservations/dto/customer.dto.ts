import { IsEmail, IsString, IsPhoneNumber } from 'class-validator';

export class CustomerDTO {
  @IsString()
  surName: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  addressLine: string;

  @IsString()
  cityName: string;

  @IsString()
  postalCode: string;

  @IsString()
  countryName: string;
}
