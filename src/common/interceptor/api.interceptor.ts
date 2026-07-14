import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '@common/types';

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: ApiResponse<any>) => this.responseHandler(res)),
      catchError((err: HttpException | Error) => {
        return throwError(() => this.errorHandler(err, context));
      }),
    );
  }

  errorHandler(exception: HttpException | Error, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

    response.status(statusCode).json({
      success: 0,
      message: exception.message,
    });

    return exception.message;
  }

  responseHandler(res: ApiResponse<any>) {
    return {
      success: 1,
      message: res.message,
      data: res.data,
    };
  }
}
