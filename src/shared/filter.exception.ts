import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('error filter grabs', exception.getResponse());
    return new RpcException(exception.getResponse());
  }
}
