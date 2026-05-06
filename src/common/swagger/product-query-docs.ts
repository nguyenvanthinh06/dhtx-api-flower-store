import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { swaggerExamples } from './swagger-examples';

export function ApiProductQueryDocs() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      example: swaggerExamples.productQuery.page,
      description: 'Trang hiện tại của danh sách sản phẩm.',
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      example: swaggerExamples.productQuery.limit,
      description: 'Số lượng sản phẩm trên mỗi trang.',
    }),
    ApiQuery({
      name: 'categoryId',
      required: false,
      example: swaggerExamples.productQuery.categoryId,
      description: 'Lọc theo ID danh mục.',
    }),
    ApiQuery({
      name: 'type',
      required: false,
      example: swaggerExamples.productQuery.type,
      description: 'Lọc theo loại: bó hoa, hộp hoa, lẵng hoa...',
    }),
    ApiQuery({
      name: 'color',
      required: false,
      example: swaggerExamples.productQuery.color,
      description: 'Lọc theo màu sắc hoa.',
    }),
    ApiQuery({
      name: 'minPrice',
      required: false,
      example: swaggerExamples.productQuery.minPrice,
      description: 'Giá thấp nhất.',
    }),
    ApiQuery({
      name: 'maxPrice',
      required: false,
      example: swaggerExamples.productQuery.maxPrice,
      description: 'Giá cao nhất.',
    }),
    ApiQuery({
      name: 'keyword',
      required: false,
      example: swaggerExamples.productQuery.keyword,
      description: 'Từ khóa tìm kiếm theo tên/mô tả.',
    }),
  );
}
