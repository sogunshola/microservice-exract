import { CreateCardDto } from './../cards/dto/create-card.dto';
import { AxiosService } from './../axios/axios.service';
import { Injectable, Logger } from '@nestjs/common';
import {
  CreateCardPaymentDto,
  ValidateCardDto,
  TokenizedDto,
} from './dto/create-card-payment.dto';
import { UpdateCardPaymentDto } from './dto/update-card-payment.dto';
import * as forge from 'node-forge';
import { CardsService } from '../cards/cards.service';
import axios from 'axios';

process
  .on('unhandledRejection', (reason, p) => {
    // console.error(reason, 'Unhandled Rejection at Promise', p);

    console.error('the reason is', reason, p);
  })
  .on('uncaughtException', (err) => {
    // console.error(err, 'Uncaught Exception thrown');
    console.error('the error is ', err);
    process.exit(1);
  });

@Injectable()
export class CardPaymentsService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly cardsService: CardsService,
  ) {}
  private readonly logger = new Logger(CardPaymentsService.name);
  async initiate(createCardPaymentDto: CreateCardPaymentDto) {
    const {
      amount,
      cardNumber,
      currency,
      cvv,
      email,
      expiryMonth,
      expiryYear,
      fullName,
    } = createCardPaymentDto;

    let doesExist: any = await this.cardsService.findByCardNumber(cardNumber);

    if (doesExist && doesExist.token != null) {
      let tokenPayload: TokenizedDto = {
        amount,
        country: 'NG',
        currency,
        email,
        token: doesExist.token,
        tx_ref: `${email}/${Date.now()}`,
      };
      return await this.tokenizedCard(tokenPayload);
    }
    let payload = {
      card_number: cardNumber,
      cvv,
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
      currency,
      amount,
      email,
      fullname: fullName,
      tx_ref: `${email}/${Date.now()}`,
      type: 'card',
      // redirect_url: 'https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c',
    };

    let client = this.encrypt(
      process.env.FLUTTERWAVE_ENCRYPTION_KEY,
      JSON.stringify(payload),
    );

    this.logger.debug(payload);
    this.logger.debug({ client });

    try {
      const response = await this.axiosService
        .Request()
        .post('/charges?type=card', { client });
      console.log({ response: response.data });
      return response.data;
    } catch (error) {
      this.logger.error({ error });
    }
  }

  async authorize(createCardPaymentDto: CreateCardPaymentDto) {
    const {
      amount,
      cardNumber,
      currency,
      cvv,
      email,
      expiryMonth,
      expiryYear,
      fullName,
      authorization,
    } = createCardPaymentDto;
    let payload = {
      card_number: cardNumber,
      cvv,
      expiry_month: expiryMonth,
      expiry_year: expiryYear,
      currency,
      amount,
      email,
      fullname: fullName,
      tx_ref: `${email}/${Date.now()}`,
      type: 'card',
      authorization,
      // redirect_url: 'https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c',
    };

    let client = this.encrypt(
      process.env.FLUTTERWAVE_ENCRYPTION_KEY,
      JSON.stringify(payload),
    );

    this.logger.debug(payload);
    this.logger.debug({ client });

    try {
      const response = await this.axiosService
        .Request()
        .post('/charges?type=card', { client });
      console.log({ response: response.data });

      const dataObj = response.data;
      let createCard: CreateCardDto = {
        cardNumber,
        cardType: dataObj.data.card.type,
        currency: dataObj.data.currency,
        cvv,
        customerId: dataObj.data.customer.id,
        email,
        expiryMonth,
        expiryYear,
        name: fullName,
      };

      ///Store card data to DB if it does not already exist
      let doesExist = await this.cardsService.findByCardNumber(cardNumber);
      if (!doesExist) {
        await this.cardsService.create(createCard);
      }

      return dataObj;
    } catch (error) {
      this.logger.error({ error });
    }
  }

  async validate(validateDto: ValidateCardDto) {
    const { flwRef, otp, cardNumber } = validateDto;

    let payload = {
      otp,
      flw_ref: flwRef,
      type: 'card',
    };

    this.logger.debug(payload);

    try {
      const response = await this.axiosService
        .Request()
        .post('/validate-charge', payload);
      console.log({ response: response.data });
      const dataObj = response.data;

      /// Verify if payment was successful
      const verify = await this.verifyPayment(dataObj.data.id);

      /// Save token for card to perform tokenized payments on next try
      let cardDetail: any = await this.cardsService.findByCardNumber(
        cardNumber,
      );
      await this.cardsService.update(cardDetail.id, {
        ...cardDetail,
        token: verify.data.card.token,
      });
      return dataObj;
    } catch (error) {
      this.logger.error({ error });
    }
  }

  async verifyPayment(id: string) {
    try {
      const response = await this.axiosService
        .Request()
        .get(`/transactions/${id}/verify`);
      console.log({ response: response.data });
      const dataObj = response.data;
      return dataObj;
    } catch (error) {
      this.logger.error({ error });
    }
  }

  private async tokenizedCard(payload: TokenizedDto) {
    try {
      const response = await this.axiosService
        .Request()
        .post('/tokenized-charges', payload);
      console.log({ response: response.data });
      const dataObj = response.data;
      return dataObj;
    } catch (error) {
      this.logger.error({ error });
    }
  }

  private encrypt(key, text) {
    var cipher = forge.cipher.createCipher(
      '3DES-ECB',
      forge.util.createBuffer(key),
    );
    cipher.start({ iv: '' });
    cipher.update(forge.util.createBuffer(text, 'utf-8'));
    cipher.finish();
    var encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
  }
}
