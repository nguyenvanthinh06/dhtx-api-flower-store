import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiEnvelopeOk } from '../../common/swagger/api-response-docs';
import { swaggerExamples } from '../../common/swagger/swagger-examples';
import { CreateOrderDto } from './dto';
import { OrdersService } from './orders.service';

@ApiTags('Client - Orders')
@Controller('orders')
export class ClientOrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Đặt hàng với phương thức thanh toán COD duy nhất.' })
  @ApiBody({ type: CreateOrderDto, examples: { demo: { value: swaggerExamples.createOrder } } })
  @ApiEnvelopeOk({ description: 'Đơn hàng COD vừa tạo.' })
  createCodOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createCodOrder(dto);
  }
}
