import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentAdmin } from '../../common/decorators/current-admin.decorator';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { ApiEnvelopeOk } from '../../common/swagger/api-response-docs';
import { swaggerExamples } from '../../common/swagger/swagger-examples';
import { AuthService } from './auth.service';
import { AdminUser } from './auth.types';
import {
  AdminUserQueryDto,
  CreateAdminUserDto,
  UpdateAdminUserDto,
} from './dto';

@ApiTags('Admin - Users')
@ApiBearerAuth('admin-token')
@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @ApiOperation({
    summary: 'Danh sách tài khoản quản trị có thể đăng nhập admin.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: swaggerExamples.adminUserQuery.page,
    description: 'Trang hiện tại.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: swaggerExamples.adminUserQuery.limit,
    description: 'Số tài khoản trên mỗi trang.',
  })
  @ApiQuery({
    name: 'keyword',
    required: false,
    example: swaggerExamples.adminUserQuery.keyword,
    description: 'Tìm theo tên hoặc email.',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    example: swaggerExamples.adminUserQuery.isActive,
    description: 'Lọc tài khoản đang hoạt động hoặc đã khóa.',
  })
  @ApiEnvelopeOk({
    isArray: true,
    paginated: true,
    description: 'Danh sách tài khoản quản trị.',
  })
  findAll(@Query() query: AdminUserQueryDto) {
    return this.authService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết một tài khoản quản trị.' })
  @ApiParam({ name: 'id', example: 1, description: 'ID tài khoản quản trị.' })
  @ApiEnvelopeOk({ description: 'Thông tin tài khoản quản trị.' })
  findOne(@Param('id', PositiveIntPipe) id: number) {
    return this.authService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Tạo tài khoản quản trị mới để có thể đăng nhập admin.',
  })
  @ApiBody({
    type: CreateAdminUserDto,
    examples: { demo: { value: swaggerExamples.createAdminUser } },
  })
  @ApiEnvelopeOk({ description: 'Tài khoản quản trị vừa tạo.' })
  create(@Body() dto: CreateAdminUserDto) {
    return this.authService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin, quyền hoặc mật khẩu quản trị.' })
  @ApiParam({ name: 'id', example: 2, description: 'ID tài khoản cần cập nhật.' })
  @ApiBody({
    type: UpdateAdminUserDto,
    examples: { demo: { value: swaggerExamples.updateAdminUser } },
  })
  @ApiEnvelopeOk({ description: 'Tài khoản quản trị sau khi cập nhật.' })
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateAdminUserDto,
  ) {
    return this.authService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa tài khoản quản trị không còn sử dụng.' })
  @ApiParam({ name: 'id', example: 2, description: 'ID tài khoản cần xóa.' })
  @ApiEnvelopeOk({ description: 'Tài khoản quản trị vừa bị xóa.' })
  remove(
    @Param('id', PositiveIntPipe) id: number,
    @CurrentAdmin() currentAdmin: AdminUser,
  ) {
    return this.authService.remove(id, currentAdmin);
  }
}
