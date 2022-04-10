import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception.message.includes('duplicate key')) {
      const regex = /\((.*?)\)/g;
      const duplicates = exception.driverError.detail
        .match(regex)[0]
        .replace('(', '')
        .replace(')', '')
        .split(',');

      res.status(409).json({
        error: 'Unique constraint failed',
        duplicates: duplicates,
      });
    } else {
      res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}
