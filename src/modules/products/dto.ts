import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { swaggerExamples } from '../../common/swagger/swagger-examples';

export class ProductQueryDto {
  @ApiPropertyOptional({
    example: swaggerExamples.productQuery.page,
    default: 1,
    minimum: 1,
    description: 'Trang hiện tại của danh sách sản phẩm.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    example: swaggerExamples.productQuery.limit,
    default: 10,
    minimum: 1,
    description: 'Số lượng sản phẩm trên mỗi trang.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({
    example: swaggerExamples.productQuery.categoryId,
    description: 'Lọc theo ID danh mục sản phẩm.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({
    example: swaggerExamples.productQuery.type,
    description: 'Lọc theo kiểu đóng gói như bó hoa, hộp hoa, lẵng hoa.',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    example: swaggerExamples.productQuery.color,
    description: 'Lọc theo màu sắc hoa hoặc tone màu chủ đạo.',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({
    example: swaggerExamples.productQuery.minPrice,
    minimum: 0,
    description: 'Giá thấp nhất cần lọc.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({
    example: swaggerExamples.productQuery.maxPrice,
    minimum: 0,
    description: 'Giá cao nhất cần lọc.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({
    example: swaggerExamples.productQuery.keyword,
    description: 'Từ khóa tìm theo tên hoặc mô tả sản phẩm.',
  })
  @IsOptional()
  @IsString()
  keyword?: string;
}

export class ProductVariantDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID biến thể. Không cần truyền khi tạo mới sản phẩm.',
  })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({
    example: swaggerExamples.createProduct.variants[0].type,
    description: 'Loại biến thể: bó hoa, hộp hoa, lẵng hoa...',
  })
  @IsString()
  type: string;

  @ApiProperty({
    example: swaggerExamples.createProduct.variants[0].color,
    description: 'Màu sắc của biến thể.',
  })
  @IsString()
  color: string;

  @ApiProperty({
    example: swaggerExamples.createProduct.variants[0].sku,
    description: 'SKU duy nhất cho biến thể.',
  })
  @IsString()
  sku: string;

  @ApiProperty({
    example: swaggerExamples.createProduct.variants[0].price,
    minimum: 0,
    description: 'Giá bán của biến thể.',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    example: swaggerExamples.createProduct.variants[0].stock,
    minimum: 0,
    description: 'Số lượng tồn kho của biến thể.',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock: number;
}

export class CreateProductDto {
  @ApiProperty({
    example: swaggerExamples.createProduct.categoryId,
    description: 'ID danh mục chứa sản phẩm.',
  })
  @Type(() => Number)
  @IsInt()
  categoryId: number;

  @ApiProperty({
    example: swaggerExamples.createProduct.name,
    minLength: 2,
    description: 'Tên sản phẩm hoa.',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: swaggerExamples.createProduct.slug,
    minLength: 2,
    description: 'Slug duy nhất của sản phẩm.',
  })
  @IsString()
  @MinLength(2)
  slug: string;

  @ApiProperty({
    example: swaggerExamples.createProduct.description,
    description: 'Mô tả chi tiết sản phẩm.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: swaggerExamples.createProduct.images,
    type: [String],
    description: 'Danh sách ảnh sản phẩm.',
  })
  @IsArray()
  images: string[];

  @ApiProperty({
    example: swaggerExamples.createProduct.basePrice,
    minimum: 0,
    description: 'Giá cơ bản dùng để lọc/tổng quan.',
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({
    example: swaggerExamples.createProduct.colors,
    type: [String],
    description: 'Các màu sắc hiện có của sản phẩm.',
  })
  @IsArray()
  @ArrayMinSize(1)
  colors: string[];

  @ApiProperty({
    example: swaggerExamples.createProduct.types,
    type: [String],
    description: 'Các loại/kiểu đóng gói hiện có của sản phẩm.',
  })
  @IsArray()
  @ArrayMinSize(1)
  types: string[];

  @ApiProperty({
    example: swaggerExamples.createProduct.tags,
    type: [String],
    description: 'Tags phục vụ gợi ý sản phẩm tương tự.',
  })
  @IsArray()
  tags: string[];

  @ApiPropertyOptional({
    example: swaggerExamples.createProduct.isActive,
    default: true,
    description: 'Bật/tắt trạng thái hiển thị sản phẩm.',
  })
  @IsOptional()
  @IsBoolean()
  isActive = true;

  @ApiProperty({
    example: swaggerExamples.createProduct.variants,
    type: [ProductVariantDto],
    description: 'Danh sách biến thể theo từng loại, từng màu sắc, SKU và tồn kho.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDto)
  @ArrayMinSize(1)
  variants: ProductVariantDto[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
