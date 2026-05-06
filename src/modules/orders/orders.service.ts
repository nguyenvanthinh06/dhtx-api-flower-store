import { BadRequestException, Injectable } from '@nestjs/common';
import { FlowerStoreRepository } from '../seed/flower-store.repository';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(private readonly repository: FlowerStoreRepository) {}

  createCodOrder(dto: CreateOrderDto) {
    const items = dto.items.map((item) => {
      const product = this.repository.findProductById(item.productId);
      const variant = product.variants.find(
        (productVariant) => productVariant.id === item.variantId,
      );

      if (!variant) throw new BadRequestException('Product variant is invalid');
      if (variant.stock < item.quantity) {
        throw new BadRequestException(`SKU ${variant.sku} is out of stock`);
      }

      this.repository.updateVariantStock(
        product.id,
        variant.id,
        variant.stock - item.quantity,
      );

      return {
        productId: product.id,
        variantId: variant.id,
        quantity: item.quantity,
        unitPrice: variant.price,
      };
    });

    const totalAmount = items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0,
    );

    return this.repository.createOrder({
      customerName: dto.customerName,
      phone: dto.phone,
      address: dto.address,
      note: dto.note,
      paymentMethod: 'COD',
      items,
      totalAmount,
    });
  }
}
