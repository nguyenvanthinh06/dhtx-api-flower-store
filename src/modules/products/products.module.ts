import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SeedModule } from '../seed/seed.module';
import { AdminProductsController } from './admin-products.controller';
import { ClientProductsController } from './client-products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [AuthModule, SeedModule],
  controllers: [ClientProductsController, AdminProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
