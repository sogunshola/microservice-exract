import { PartialType } from '@nestjs/mapped-types';
import { CreateCardPaymentDto } from './create-card-payment.dto';

export class UpdateCardPaymentDto extends PartialType(CreateCardPaymentDto) {
  id: number;
}
