import {
  CreateCardPaymentDto,
  ValidateCardDto,
} from './../src/card-payments/dto/create-card-payment.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { getConnection } from 'typeorm';

jest.setTimeout(100000);

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          {
            name: 'clientToken',
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RMQ_URL],
              queue: process.env.PAYOUT_REQUEST_RMQ_QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: process.env.PAYOUT_REQUEST_RMQ_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    });
    await app.startAllMicroservicesAsync();
    await app.init();
    client = app.get('clientToken');
    // await runSeeder(PayoutStatusSeed);
  });

  const initDatabase = async () => {
    const connection = getConnection();
    await connection.createQueryBuilder().delete().execute();
    return connection;
  };

  afterAll(async () => {
    // await initDatabase();
    await app.close();
    client.close();
  });

  describe('Card Payment', () => {
    const payload: CreateCardPaymentDto = {
      amount: '3000',
      cardNumber: '4556052704172643',
      currency: 'NGN',
      cvv: '899',
      email: 'test@mail.com',
      expiryMonth: '09',
      expiryYear: '32',
      fullName: 'SHalom ogunshola',
    };

    // const validatePayload: ValidateCardDto = {
    //   cardNumber: '5531886652142950',
    //   flwRef: 'FLW-MOCK-53eb71680267bd0e7b78d8972287b411',
    //   otp: '123456',
    // };
    // it('Should initate payment', async (done) => {
    //   const resPayload = await client
    //     .send(
    //       { cmd: 'initiateCardPayment' },
    //       {
    //         ...payload,
    //       },
    //     )
    //     .toPromise();

    //   // console.log('resPayload', resPayload);
    //   expect(resPayload.object).toBe('initiatePayment');
    //   done();
    // });

    it('Should authorize card and store card data', async (done) => {
      const resPayload = await client
        .send(
          { cmd: 'authorizeCardPayment' },
          {
            ...payload,
            authorization: {
              mode: 'avs_noauth',
              // pin: '3310',
              city: 'San Francisco',
              address: '333 Fremont Street, San Francisco, CA',
              state: 'California',
              country: 'US',
              zipcode: '94105',
            },
          },
        )
        .toPromise();

      // console.log('resPayload', resPayload);
      expect(resPayload.object).toBe('authorizePayment');
      done();
    });

    // it('Should authorize card and store card data', async (done) => {
    //   const resPayload = await client
    //     .send(
    //       { cmd: 'validateCardPayment' },
    //       {
    //         ...validatePayload,
    //       },
    //     )
    //     .toPromise();

    //   // console.log('resPayload', resPayload);
    //   expect(resPayload.object).toBe('validatePayment');
    //   done();
    // });
  });
});
