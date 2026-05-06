import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AdminAuthMiddleware } from './modules/auth/admin-auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    SeedModule,
    AuthModule,
    CatalogModule,
    ProductsModule,
    InventoryModule,
    OrdersModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .exclude({ path: 'admin/auth/login', method: RequestMethod.POST })
      .forRoutes('admin/*');
  }
}
