import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { swaggerExamples } from '../../common/swagger/swagger-examples';

export class UpdateStockDto {
  @ApiProperty({
    example: swaggerExamples.updateStock.productId,
    description: 'ID sản phẩm chứa biến thể cần cập nhật tồn kho.',
  })
  @Type(() => Number)
  @IsInt()
  productId: number;

  @ApiProperty({
    example: swaggerExamples.updateStock.variantId,
    description: 'ID biến thể theo loại/màu/SKU cần cập nhật tồn kho.',
  })
  @Type(() => Number)
  @IsInt()
  variantId: number;

  @ApiProperty({
    example: swaggerExamples.updateStock.stock,
    minimum: 0,
    description: 'Số lượng tồn kho mới.',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock: number;
}
