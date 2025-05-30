import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const contexto = host.switchToHttp();
        const response = contexto.getResponse<Response>();
        const request = contexto.getRequest<{ url: string }>();

        let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | Record<string, unknown> | string[] = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();

            if (typeof errorResponse === 'string') {
                message = errorResponse;
            } else if (Array.isArray((errorResponse as { message: string[] }).message)) {
                message = (errorResponse as { message: string[] }).message.join(', ');
            } else if (typeof errorResponse === 'object' && errorResponse !== null) {
                message = errorResponse as Record<string, unknown>;
            }
        } else if (exception instanceof Error) {
            // Captura erros gerais, incluindo aqueles do Mongoose
            message = exception.message;
            if (exception.name === 'MongoError') {
                status = HttpStatus.BAD_REQUEST;
            }
        }

        this.logger.error(`HTTP Status: ${status}, Error Message: ${JSON.stringify(message)}`);

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            ...(typeof message === 'object' && message !== null ? message : { message }),
        });
    }
}
