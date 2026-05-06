import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { swaggerExamples } from '../../common/swagger/swagger-examples';

export class CreateCategoryDto {
  @ApiProperty({
    example: swaggerExamples.createCategory.name,
    minLength: 2,
    description: 'Tên danh mục hoa hiển thị cho quản trị/client.',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: swaggerExamples.createCategory.slug,
    minLength: 2,
    description: 'Slug duy nhất dùng cho SEO hoặc routing.',
  })
  @IsString()
  @MinLength(2)
  slug: string;

  @ApiPropertyOptional({
    example: swaggerExamples.createCategory.description,
    description: 'Mô tả ngắn về danh mục.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: swaggerExamples.createCategory.isActive,
    default: true,
    description: 'Bật/tắt trạng thái hiển thị của danh mục.',
  })
  @IsOptional()
  @IsBoolean()
  isActive = true;
}
