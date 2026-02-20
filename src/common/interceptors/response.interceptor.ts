import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((response) => ({
        success: true,
        message: response.message ?? '요청 성공',
        data: response.data ?? response,
        total: Array.isArray(response.data) ? response.data.length : undefined,
      })),
    );
  }
}
