import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCardPaymentDto {
  @IsNotEmpty() cardNumber: string;
  @IsNotEmpty() cvv: string;
  @IsNotEmpty() expiryMonth: string;
  @IsNotEmpty() expiryYear: string;
  @IsNotEmpty() currency: string;
  @IsNotEmpty() amount: string;
  @IsNotEmpty() email: string;
  @IsOptional() fullName: string;
  @IsOptional() authorization?: any;
}

export class ValidateCardDto {
  @IsNotEmpty() otp: string;
  @IsNotEmpty() flwRef: string;
  @IsNotEmpty() cardNumber: string;
}

export interface TokenizedDto {
  token: string;
  currency: string;
  country: string;
  amount: string;
  email: string;
  tx_ref: string;
}
