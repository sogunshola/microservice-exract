import { IsNotEmpty } from 'class-validator';
export class CreateChargeDto {
  @IsNotEmpty()
  txRef: string;

  @IsNotEmpty()
  flwRef: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  chargedAmount: string;

  @IsNotEmpty()
  accountId: string;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  processorResponse: string;

  @IsNotEmpty()
  cardId: string;
}
