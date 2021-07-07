import { ChargeModule } from './../charge/charge.module';
import { CardsModule } from './../cards/cards.module';
import { Module } from '@nestjs/common';
import { CardPaymentsService } from './card-payments.service';
import { CardPaymentsController } from './card-payments.controller';
import { AxiosModule } from '../axios/axios.module';
import { RedirectLinksModule } from '../redirect-links/redirect-links.module';

@Module({
  imports: [AxiosModule, CardsModule, ChargeModule, RedirectLinksModule],
  controllers: [CardPaymentsController],
  providers: [CardPaymentsService],
})
export class CardPaymentsModule {}
