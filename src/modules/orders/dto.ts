import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { swaggerExamples } from '../../common/swagger/swagger-examples';

export class CreateOrderItemDto {
  @ApiProperty({
    example: swaggerExamples.createOrder.items[0].productId,
    description: 'ID sản phẩm khách đặt.',
  })
  @Type(() => Number)
  @IsInt()
  productId: number;

  @ApiProperty({
    example: swaggerExamples.createOrder.items[0].variantId,
    description: 'ID biến thể cụ thể theo loại/màu sắc.',
  })
  @Type(() => Number)
  @IsInt()
  variantId: number;

  @ApiProperty({
    example: swaggerExamples.createOrder.items[0].quantity,
    minimum: 1,
    description: 'Số lượng đặt mua.',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: swaggerExamples.createOrder.customerName,
    description: 'Tên người nhận hoặc người đặt hàng.',
  })
  @IsString()
  customerName: string;

  @ApiProperty({
    example: swaggerExamples.createOrder.phone,
    description: 'Số điện thoại Việt Nam để xác nhận giao hàng.',
  })
  @IsPhoneNumber('VN')
  phone: string;

  @ApiProperty({
    example: swaggerExamples.createOrder.address,
    description: 'Địa chỉ giao hàng COD.',
  })
  @IsString()
  address: string;

  @ApiPropertyOptional({
    example: swaggerExamples.createOrder.note,
    description: 'Ghi chú giao hàng tùy chọn.',
  })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({
    example: swaggerExamples.createOrder.items,
    type: [CreateOrderItemDto],
    description: 'Danh sách sản phẩm/biến thể trong đơn hàng.',
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayMinSize(1)
  items: CreateOrderItemDto[];
}
