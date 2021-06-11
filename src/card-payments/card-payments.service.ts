import { CreateChargeDto } from './../charge/dto/create-charge.dto';
import { CreateCardDto } from './../cards/dto/create-card.dto';
import { AxiosService } from './../axios/axios.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  CreateCardPaymentDto,
  ValidateCardDto,
  TokenizedDto,
} from './dto/create-card-payment.dto';
import { UpdateCardPaymentDto } from './dto/update-card-payment.dto';
import * as forge from 'node-forge';
import { CardsService } from '../cards/cards.service';
import { stringify } from 'node:querystring';
import { ChargeService } from '../charge/charge.service';

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

/* 
  PAYMENT REQUEST FLOW
- customer updates payment method
- authenticate their payment method (next -action)
- complete the payment request
  */

@Injectable()
export class CardPaymentsService {
  constructor(
    private readonly axiosService: AxiosService,
    private readonly cardsService: CardsService,
    private readonly chargeService: ChargeService,
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
        .post(process.env.CHARGE_URI, { client });
      console.log({ response: response.data.meta });
      response.data.completed = false;
      const nextAction = this.generateNextAction('intiate', response.data.meta);
      return { ...response.data, nextAction };
    } catch (error) {
      this.logger.error({ error });
      throw new BadRequestException(
        'Failed, Error while connecting to third party',
      );
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
      redirect_url: 'https://webhook.site/3ed41e38-2c79-4c79-b455-97398730866c',
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
        .post(process.env.CHARGE_URI, { client });
      console.log({ response: response.data.meta });

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
      dataObj.completed = false;
      const nextAction = this.generateNextAction('authorize', dataObj.meta);
      return { ...dataObj, nextAction };
    } catch (error) {
      this.logger.error({ error });
      this.logger.error({ error });
      throw new BadRequestException('Failed, Error while authorizing card');
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
        .post(process.env.VALIDATE_CHARGE_URI, payload);
      console.log({ response: response.data });
      const dataObj = response.data;

      /// Verify if payment was successful
      const verify = await this.verifyPayment(dataObj.data.id);
      const verifyResponse = verify.data;

      /// Save token for card to perform tokenized payments on next try
      let cardDetail: any = await this.cardsService.findByCardNumber(
        cardNumber,
      );
      await this.cardsService.update(cardDetail.id, {
        ...cardDetail,
        token: verifyResponse.card.token,
      });

      /// Save charge
      const chargePayload: CreateChargeDto = {
        accountId: verifyResponse.account_id,
        amount: verifyResponse.amount,
        cardId: cardDetail.id,
        chargedAmount: verifyResponse.charged_amount,
        currency: verifyResponse.currency,
        flwRef: verifyResponse.flw_ref,
        processorResponse: verifyResponse.processor_response,
        txRef: verifyResponse.tx_ref,
      };
      console.log({ chargePayload });

      await this.saveCharge(chargePayload);

      dataObj.completed = true;
      return dataObj;
    } catch (error) {
      this.logger.error({ error });
      throw new BadRequestException('Failed, Error while validating payment');
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
      this.logger.error({ error });
      throw new BadRequestException('Failed, Error while verifying payment');
    }
  }

  private async tokenizedCard(payload: TokenizedDto) {
    try {
      const response = await this.axiosService
        .Request()
        .post(process.env.TOKENIZED_CHARGE_URI, payload);
      console.log({ response: response.data });
      const dataObj = response.data;
      dataObj.completed = true;
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

  private generateNextAction(
    type: 'intiate' | 'authorize' | 'validate',
    meta: any,
  ) {
    if (type == 'intiate') {
      const obj = {};

      if (meta.authorization.fields) {
        for (const key of meta.authorization.fields) {
          obj[key] = 'string';
        }
      }
      return {
        mode: 'authorizeCard',
        payload: {
          createCardPayment: <CreateCardPaymentDto>{
            amount: 'string',
            cardNumber: 'string',
            currency: 'string',
            cvv: 'string',
            email: 'string',
            expiryMonth: 'string',
            expiryYear: 'string',
            fullName: 'string',
            authorization: {
              mode: meta.authorization.mode,
              ...obj,
            },
          },
        },
      };
    } else if (type == 'authorize') {
      return {
        mode: 'authorizeCard',
        payload: {
          validateCard: <ValidateCardDto>{
            cardNumber: 'string',
            flwRef: 'string',
            otp: 'string',
            // authorization: {
            //   mode: meta.authorization.mode,
            //   ...(meta.authorization.fields.reduce(
            //     (o, key) => Object.assign(o, { [key]: 'string' }),
            //     {},
            //   ) ?? null),
            // },
          },
        },
      };
    }
  }

  private saveCharge(payload: CreateChargeDto) {
    this.chargeService.create(payload);
  }
}
