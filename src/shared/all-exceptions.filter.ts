import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    var errorFormat = {
      error: null,
      // status: false,
      message: null,
      code: null,
      // object: 'error',
    };

    // console.log('error response is', exception.response);

    errorFormat.code = status;

    if (!exception.response) {
      console.log('error is', exception.message);
      (errorFormat.message = exception.message),
        (errorFormat.error = exception.error);
      response.status(status).json(errorFormat);
      return;
    }

    console.log('error response is', exception.response);
    const data = exception.response;

    errorFormat.message = data.message;
    errorFormat.error = data.error;

    response.status(status).json(errorFormat);
  }
}

// catch(exception: any, host: ArgumentsHost) {
//   const ctx = host.switchToHttp();
//   const response = ctx.getResponse();
//   const request = ctx.getRequest();
//   const error = exception.response || exception.message;

//   console.log('error is', error);

//   var errorFormat = {
//     error: null,
//     message: null,
//     code: null,
//   };

//   // errorFormat.errors = error.

//   const status =
//     exception instanceof HttpException
//       ? exception.getStatus()
//       : HttpStatus.INTERNAL_SERVER_ERROR;

//   errorFormat.code = status;

//   const message =
//     exception instanceof HttpException
//       ? exception.message
//       : 'Internal server error';

//   errorFormat.message = error ? error.message : message;
//   errorFormat.error = error ? error.error : message;

//   // response.status(status).json({
//   //   message,
//   //   object: 'error',
//   //   code: status,
//   // });
//   response.status(status).json(errorFormat);
// }
