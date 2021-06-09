import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateCardDto {
  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  cardNumber: string;

  @IsNotEmpty()
  cvv: string;

  @IsNotEmpty()
  cardType: string;

  @IsNotEmpty()
  expiryYear: string;

  @IsNotEmpty()
  expiryMonth: string;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  email: string;

  @IsOptional()
  name: string;

  @IsNotEmpty()
  token?: string;
}
