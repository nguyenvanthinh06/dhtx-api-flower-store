import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { ApiEnvelopeOk } from '../../common/swagger/api-response-docs';
import { ApiProductQueryDocs } from '../../common/swagger/product-query-docs';
import { swaggerExamples } from '../../common/swagger/swagger-examples';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';

@ApiTags('Admin - Products')
@ApiBearerAuth('admin-token')
@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Danh sách sản phẩm cho quản trị, có filter giống client.' })
  @ApiProductQueryDocs()
  @ApiEnvelopeOk({ isArray: true, paginated: true, description: 'Danh sách sản phẩm quản trị.' })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAllForAdmin(query);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo sản phẩm mới với biến thể theo từng loại và màu sắc.' })
  @ApiBody({ type: CreateProductDto, examples: { demo: { value: swaggerExamples.createProduct } } })
  @ApiEnvelopeOk({ description: 'Sản phẩm vừa tạo.' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật sản phẩm và danh sách biến thể.' })
  @ApiParam({ name: 'id', example: 1, description: 'ID sản phẩm cần cập nhật.' })
  @ApiBody({ type: UpdateProductDto, examples: { demo: { value: swaggerExamples.updateProduct } } })
  @ApiEnvelopeOk({ description: 'Sản phẩm sau khi cập nhật.' })
  update(
    @Param('id', PositiveIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }
}
