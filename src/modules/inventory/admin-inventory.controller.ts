import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiEnvelopeOk } from '../../common/swagger/api-response-docs';
import { swaggerExamples } from '../../common/swagger/swagger-examples';
import { UpdateStockDto } from './dto';
import { InventoryService } from './inventory.service';

@ApiTags('Admin - Inventory')
@ApiBearerAuth('admin-token')
@Controller('admin/inventory')
export class AdminInventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Xem tồn kho theo từng sản phẩm và biến thể.' })
  @ApiEnvelopeOk({ isArray: true, description: 'Danh sách tồn kho.' })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Patch('stock')
  @ApiOperation({ summary: 'Cập nhật tồn kho cho một biến thể sản phẩm.' })
  @ApiBody({ type: UpdateStockDto, examples: { demo: { value: swaggerExamples.updateStock } } })
  @ApiEnvelopeOk({ description: 'Sản phẩm sau khi cập nhật tồn kho.' })
  updateStock(@Body() dto: UpdateStockDto) {
    return this.inventoryService.updateStock(dto);
  }
}
