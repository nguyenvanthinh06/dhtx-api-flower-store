import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PositiveIntPipe } from '../../common/pipes/positive-int.pipe';
import { ApiEnvelopeOk } from '../../common/swagger/api-response-docs';
import { ApiProductQueryDocs } from '../../common/swagger/product-query-docs';
import { ProductQueryDto } from './dto';
import { ProductsService } from './products.service';

@ApiTags('Client - Products')
@Controller('products')
export class ClientProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Danh sách sản phẩm cho client, có filter loại/giá/màu sắc.',
  })
  @ApiProductQueryDocs()
  @ApiEnvelopeOk({ isArray: true, paginated: true, description: 'Danh sách sản phẩm đã lọc.' })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findForClient(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Chi tiết sản phẩm, gồm từng loại, từng màu sắc và biến thể.' })
  @ApiParam({ name: 'id', example: 1, description: 'ID sản phẩm cần xem.' })
  @ApiEnvelopeOk({ description: 'Chi tiết sản phẩm.' })
  findDetail(@Param('id', PositiveIntPipe) id: number) {
    return this.productsService.findDetail(id);
  }

  @Get(':id/similar')
  @ApiOperation({ summary: 'Danh sách sản phẩm tương tự theo danh mục hoặc tags.' })
  @ApiParam({ name: 'id', example: 1, description: 'ID sản phẩm gốc.' })
  @ApiEnvelopeOk({ isArray: true, description: 'Sản phẩm tương tự.' })
  findSimilar(@Param('id', PositiveIntPipe) id: number) {
    return this.productsService.findSimilar(id);
  }
}
