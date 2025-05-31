import {
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('예외 발생', message, status);
    throw new InternalServerErrorException('서버 오류');
  }
}
