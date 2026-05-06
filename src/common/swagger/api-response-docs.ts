import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { PagingMeta } from '../interceptors/response.interceptor';

export class SwaggerPagingDto implements PagingMeta {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;

  @ApiProperty({ example: 32 })
  total: number;

  @ApiProperty({ example: 4 })
  totalPages: number;
}

export class SwaggerEnvelopeDto<TData = unknown> {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: 200 })
  code: number;

  data: TData;

  @ApiProperty({ required: false, type: SwaggerPagingDto })
  paging?: SwaggerPagingDto;
}

interface ApiEnvelopeOptions<TModel extends Type<unknown>> {
  model?: TModel;
  isArray?: boolean;
  paginated?: boolean;
  description?: string;
}

export function ApiEnvelopeOk<TModel extends Type<unknown>>(
  options: ApiEnvelopeOptions<TModel> = {},
) {
  const dataSchema = options.model
    ? options.isArray
      ? { type: 'array', items: { $ref: getSchemaPath(options.model) } }
      : { $ref: getSchemaPath(options.model) }
    : options.isArray
      ? { type: 'array', items: { type: 'object' } }
      : { type: 'object' };
  const extraModels = options.model
    ? [SwaggerEnvelopeDto, SwaggerPagingDto, options.model]
    : [SwaggerEnvelopeDto, SwaggerPagingDto];

  return applyDecorators(
    ApiExtraModels(...extraModels),
    ApiOkResponse({
      description: options.description ?? 'Success response',
      schema: {
        allOf: [
          { $ref: getSchemaPath(SwaggerEnvelopeDto) },
          {
            properties: {
              status: { type: 'boolean', example: true },
              code: { type: 'number', example: 200 },
              data: dataSchema,
              ...(options.paginated
                ? { paging: { $ref: getSchemaPath(SwaggerPagingDto) } }
                : {}),
            },
          },
        ],
      },
    }),
  );
}
