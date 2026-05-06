import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface PagingMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiPayload<T> {
  data: T;
  paging?: PagingMeta;
}

export interface ApiResponse<T> {
  data: T;
  code: number;
  status: boolean;
  paging?: PagingMeta;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T | ApiPayload<T>, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T | ApiPayload<T>>,
  ): Observable<ApiResponse<T>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((result) => {
        const payload = this.normalizePayload(result);

        return {
          data: payload.data,
          code: response.statusCode,
          status: true,
          ...(payload.paging ? { paging: payload.paging } : {}),
        };
      }),
    );
  }

  private normalizePayload(result: T | ApiPayload<T>): ApiPayload<T> {
    if (
      result &&
      typeof result === 'object' &&
      'data' in result &&
      !Array.isArray(result)
    ) {
      return result as ApiPayload<T>;
    }

    return { data: result as T };
  }
}
