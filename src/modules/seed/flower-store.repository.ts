import { Injectable, NotFoundException } from '@nestjs/common';
import { Category, Order, Product, ProductVariant } from './domain.types';

type NewProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'variants'> & {
  variants: Omit<ProductVariant, 'id'>[];
};

@Injectable()
export class FlowerStoreRepository {
  private categorySequence = 3;
  private productSequence = 4;
  private variantSequence = 10;
  private orderSequence = 1;

  private readonly categories: Category[] = [
    {
      id: 1,
      name: 'Hoa sinh nhật',
      slug: 'hoa-sinh-nhat',
      description: 'Những bó hoa tươi rực rỡ dành cho ngày sinh nhật.',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Hoa cưới',
      slug: 'hoa-cuoi',
      description: 'Hoa bó, hoa cầm tay và hoa trang trí tiệc cưới.',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private readonly products: Product[] = [
    {
      id: 1,
      categoryId: 1,
      name: 'Bó hồng Aurora',
      slug: 'bo-hong-aurora',
      description: 'Hoa hồng Ecuador phối baby trắng, phù hợp quà tặng cao cấp.',
      images: ['/images/bo-hong-aurora.jpg'],
      basePrice: 450000,
      colors: ['đỏ', 'hồng', 'trắng'],
      types: ['bó hoa', 'hộp hoa'],
      tags: ['premium', 'birthday', 'rose'],
      isActive: true,
      variants: [
        { id: 1, type: 'bó hoa', color: 'đỏ', sku: 'AUR-BO-DO', price: 450000, stock: 20 },
        { id: 2, type: 'bó hoa', color: 'hồng', sku: 'AUR-BO-HONG', price: 430000, stock: 16 },
        { id: 3, type: 'hộp hoa', color: 'trắng', sku: 'AUR-HOP-TRANG', price: 520000, stock: 8 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      categoryId: 2,
      name: 'Tulip Pastel',
      slug: 'tulip-pastel',
      description: 'Tulip nhập khẩu phối giấy Hàn Quốc tối giản.',
      images: ['/images/tulip-pastel.jpg'],
      basePrice: 390000,
      colors: ['vàng', 'hồng', 'tím'],
      types: ['bó hoa'],
      tags: ['wedding', 'tulip'],
      isActive: true,
      variants: [
        { id: 4, type: 'bó hoa', color: 'vàng', sku: 'TUL-BO-VANG', price: 390000, stock: 12 },
        { id: 5, type: 'bó hoa', color: 'hồng', sku: 'TUL-BO-HONG', price: 410000, stock: 10 },
        { id: 6, type: 'bó hoa', color: 'tím', sku: 'TUL-BO-TIM', price: 420000, stock: 6 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      categoryId: 1,
      name: 'Lẵng hướng dương Sunny',
      slug: 'lang-huong-duong-sunny',
      description: 'Lẵng hướng dương rực rỡ cho khai trương và chúc mừng.',
      images: ['/images/lang-huong-duong-sunny.jpg'],
      basePrice: 650000,
      colors: ['vàng'],
      types: ['lẵng hoa'],
      tags: ['congrats', 'sunflower'],
      isActive: true,
      variants: [
        { id: 7, type: 'lẵng hoa', color: 'vàng', sku: 'SUN-LANG-VANG', price: 650000, stock: 5 },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private readonly orders: Order[] = [];

  getCategories(): Category[] {
    return this.categories;
  }

  createCategory(input: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Category {
    const category = {
      ...input,
      id: this.categorySequence++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.categories.push(category);
    return category;
  }

  getProducts(): Product[] {
    return this.products;
  }

  findProductById(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  createProduct(input: NewProduct): Product {
    const product = {
      ...input,
      id: this.productSequence++,
      variants: input.variants.map((variant) => ({
        ...variant,
        id: this.variantSequence++,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.push(product);
    return product;
  }

  updateProduct(id: number, input: Partial<Product>): Product {
    const product = this.findProductById(id);
    Object.assign(product, input, { updatedAt: new Date().toISOString() });
    return product;
  }

  updateVariantStock(productId: number, variantId: number, stock: number): Product {
    const product = this.findProductById(productId);
    const variant = product.variants.find((item) => item.id === variantId);
    if (!variant) throw new NotFoundException('Product variant not found');
    variant.stock = stock;
    product.updatedAt = new Date().toISOString();
    return product;
  }

  createOrder(input: Omit<Order, 'id' | 'code' | 'status' | 'createdAt'>): Order {
    const order: Order = {
      ...input,
      id: this.orderSequence++,
      code: `FS${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }
}
