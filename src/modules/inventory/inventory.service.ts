import { Injectable } from '@nestjs/common';
import { FlowerStoreRepository } from '../seed/flower-store.repository';
import { UpdateStockDto } from './dto';

@Injectable()
export class InventoryService {
  constructor(private readonly repository: FlowerStoreRepository) {}

  findAll() {
    return this.repository.getProducts().map((product) => ({
      productId: product.id,
      name: product.name,
      variants: product.variants.map((variant) => ({
        variantId: variant.id,
        sku: variant.sku,
        type: variant.type,
        color: variant.color,
        stock: variant.stock,
      })),
    }));
  }

  updateStock(dto: UpdateStockDto) {
    return this.repository.updateVariantStock(dto.productId, dto.variantId, dto.stock);
  }
}
