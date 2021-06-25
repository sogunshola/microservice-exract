import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RpcValidationFilter } from './shared/filter.exception';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL],
        queue: process.env.CARD_RMQ_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  app.useGlobalFilters(new RpcValidationFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true}));
  app.listen(() => console.log('cards Service is listening'));
}
bootstrap();
