import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception.response.data) {
      console.log('filter error response is ', exception.response.data);
      return new RpcException({
        ...exception.response.data,
        statusCode: exception.response.status,
      });
    }
    console.log('error filter on card service grabs', exception.getResponse());
    return new RpcException(exception.getResponse());
  }
}
