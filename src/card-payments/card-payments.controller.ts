import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { sendObjectResponse } from '../utils/response-transformers';
import { CardPaymentsService } from './card-payments.service';
import {
  CreateCardPaymentDto,
  ValidateCardDto,
} from './dto/create-card-payment.dto';
import { UpdateCardPaymentDto } from './dto/update-card-payment.dto';

@Controller()
export class CardPaymentsController {
  constructor(private readonly cardPaymentsService: CardPaymentsService) {}

  @MessagePattern({ cmd: 'initiateCardPayment' })
  async initiate(@Payload() createCardPaymentDto: CreateCardPaymentDto) {
    const response = await this.cardPaymentsService.initiate(
      createCardPaymentDto,
    );
    return sendObjectResponse(response, 'initiatePayment', 'successful');
  }

  @MessagePattern({ cmd: 'authorizeCardPayment' })
  async authorize(@Payload() createCardPaymentDto: CreateCardPaymentDto) {
    const response = await this.cardPaymentsService.authorize(
      createCardPaymentDto,
    );
    return sendObjectResponse(response, 'authorizePayment', 'successful');
  }

  @MessagePattern({ cmd: 'validateCardPayment' })
  async validate(@Payload() validateDto: ValidateCardDto) {
    const response = await this.cardPaymentsService.validate(validateDto);
    return sendObjectResponse(response, 'validatePayment', 'successful');
  }
}
