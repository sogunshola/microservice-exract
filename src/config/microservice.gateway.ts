import { ClientsModule, Transport } from '@nestjs/microservices';

import * as dotenv from 'dotenv';

dotenv.config();

export const MicroServiceGateway = ClientsModule.register([
  {
    name: 'BALANCE_MICROSERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.BALANCE_RMQ_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  },
  {
    name: 'IDENTITY_MICROSERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL],
      queue: process.env.IDENTITY_RMQ_QUEUE,
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
