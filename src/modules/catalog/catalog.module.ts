import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SeedModule } from '../seed/seed.module';
import { AdminCategoriesController } from './admin-categories.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [AuthModule, SeedModule],
  controllers: [AdminCategoriesController],
  providers: [CatalogService],
})
export class CatalogModule {}
