import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiEnvelopeOk } from '../../common/swagger/api-response-docs';
import { swaggerExamples } from '../../common/swagger/swagger-examples';
import { CatalogService } from './catalog.service';
import { CreateCategoryDto } from './dto';

@ApiTags('Admin - Categories')
@ApiBearerAuth('admin-token')
@Controller('admin/categories')
export class AdminCategoriesController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách danh mục sản phẩm cho quản trị.' })
  @ApiEnvelopeOk({ isArray: true, description: 'Danh sách danh mục.' })
  findAll() {
    return this.catalogService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Tạo danh mục sản phẩm mới.' })
  @ApiBody({ type: CreateCategoryDto, examples: { demo: { value: swaggerExamples.createCategory } } })
  @ApiEnvelopeOk({ description: 'Danh mục vừa tạo.' })
  create(@Body() dto: CreateCategoryDto) {
    return this.catalogService.create(dto);
  }
}
