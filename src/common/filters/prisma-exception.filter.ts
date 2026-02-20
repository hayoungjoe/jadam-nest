import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import type { Response } from 'express';

type ErrorBody = {
  error: {
    code: string;
    message: string;
  };
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const mapped = this.mapPrismaError(exception);

    return res.status(mapped.status).json(mapped.body);
  }

  private mapPrismaError(exception: Prisma.PrismaClientKnownRequestError): {
    status: number;
    body: ErrorBody;
  } {
    const code = exception.code; // string

    switch (code) {
      case 'P2025': // Record not found (update/delete)
      case 'P2001': // Record not found (some queries)
        return {
          status: HttpStatus.NOT_FOUND,
          body: {
            error: { code: 'NOT_FOUND', message: '리소스를 찾을 수 없습니다.' },
          },
        };

      case 'P2002': // Unique constraint failed
        return {
          status: HttpStatus.CONFLICT,
          body: {
            error: { code: 'CONFLICT', message: '이미 존재하는 값입니다.' },
          },
        };

      case 'P2003': // Foreign key constraint failed
        return {
          status: HttpStatus.BAD_REQUEST,
          body: {
            error: {
              code: 'BAD_REQUEST',
              message: '유효하지 않은 참조 값입니다.',
            },
          },
        };

      default:
        return {
          status: HttpStatus.BAD_REQUEST,
          body: {
            error: {
              code: 'PRISMA_ERROR',
              message: '요청을 처리할 수 없습니다.',
            },
          },
        };
    }
  }
}
