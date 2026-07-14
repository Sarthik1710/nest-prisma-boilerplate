import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException |  Error, host: ArgumentsHost) {
        const body = {
            success: 0,
            message: exception.message,
        };

        const statusCode = exception instanceof HttpException ?
            exception.getStatus() :
            500;
            
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.status(statusCode).json(body);
    }
}