import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { swaggerExamples } from '../../common/swagger/swagger-examples';

export class LoginDto {
  @ApiProperty({
    example: swaggerExamples.adminLogin.email,
    description: 'Email quản trị dùng để đăng nhập dashboard.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: swaggerExamples.adminLogin.password,
    minLength: 6,
    description: 'Mật khẩu quản trị.',
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class AdminUserQueryDto {
  @ApiPropertyOptional({
    example: swaggerExamples.adminUserQuery.page,
    default: 1,
    minimum: 1,
    description: 'Trang hiện tại của danh sách tài khoản quản trị.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    example: swaggerExamples.adminUserQuery.limit,
    default: 10,
    minimum: 1,
    description: 'Số lượng tài khoản quản trị trên mỗi trang.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({
    example: swaggerExamples.adminUserQuery.keyword,
    description: 'Tìm theo tên hoặc email tài khoản quản trị.',
  })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({
    example: swaggerExamples.adminUserQuery.isActive,
    description: 'Lọc theo trạng thái hoạt động của tài khoản.',
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (value === true || value === 'true') return true;
    if (value === false || value === 'false') return false;
    return value;
  })
  @IsBoolean()
  isActive?: boolean;
}

export class CreateAdminUserDto {
  @ApiProperty({
    example: swaggerExamples.createAdminUser.email,
    description: 'Email đăng nhập duy nhất của người quản trị.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: swaggerExamples.createAdminUser.password,
    minLength: 6,
    description: 'Mật khẩu ban đầu của người quản trị.',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: swaggerExamples.createAdminUser.name,
    minLength: 2,
    description: 'Tên hiển thị của người quản trị.',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: swaggerExamples.createAdminUser.roles,
    type: [String],
    description: 'Danh sách quyền của tài khoản quản trị.',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  roles: string[];

  @ApiPropertyOptional({
    example: swaggerExamples.createAdminUser.isActive,
    default: true,
    description: 'Bật/tắt khả năng đăng nhập của tài khoản.',
  })
  @IsOptional()
  @IsBoolean()
  isActive = true;
}

export class UpdateAdminUserDto {
  @ApiPropertyOptional({
    example: swaggerExamples.updateAdminUser.email,
    description: 'Email đăng nhập mới nếu cần thay đổi.',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: swaggerExamples.updateAdminUser.password,
    minLength: 6,
    description: 'Mật khẩu mới nếu cần đổi mật khẩu.',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    example: swaggerExamples.updateAdminUser.name,
    minLength: 2,
    description: 'Tên hiển thị mới của người quản trị.',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    example: swaggerExamples.updateAdminUser.roles,
    type: [String],
    description: 'Danh sách quyền mới của tài khoản quản trị.',
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  roles?: string[];

  @ApiPropertyOptional({
    example: swaggerExamples.updateAdminUser.isActive,
    description: 'Trạng thái hoạt động mới của tài khoản.',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
