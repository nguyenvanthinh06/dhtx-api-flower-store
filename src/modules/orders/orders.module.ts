import { Module } from '@nestjs/common';
import { SeedModule } from '../seed/seed.module';
import { ClientOrdersController } from './client-orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [SeedModule],
  controllers: [ClientOrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
