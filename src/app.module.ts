import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AxiosModule } from './axios/axios.module';
import { CardPaymentsModule } from './card-payments/card-payments.module';
import { ChargeModule } from './charge/charge.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CardsModule, AxiosModule, CardPaymentsModule, ChargeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
