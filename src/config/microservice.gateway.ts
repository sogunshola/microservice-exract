import { ClientsModule, Transport } from '@nestjs/microservices';

import * as dotenv from 'dotenv';
import { RMQ_URL, BALANCE_RMQ_QUEUE, IDENTITY_RMQ_QUEUE } from '.';

dotenv.config();

export const MicroServiceGateway = ClientsModule.register([
  {
    name: 'BALANCE_MICROSERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_URL],
      queue: BALANCE_RMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  },
  {
    name: 'IDENTITY_MICROSERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_URL],
      queue: IDENTITY_RMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  },
]);

/* export const MicroServiceGateway = ClientsModule.register([
  {
    name: 'MICROSERVICE',
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  },
]); */
