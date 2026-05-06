import { Injectable } from '@nestjs/common';
import { ApiPayload } from '../../common/interceptors/response.interceptor';
import { Product } from '../seed/domain.types';
import { FlowerStoreRepository } from '../seed/flower-store.repository';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private readonly repository: FlowerStoreRepository) {}

  findForClient(query: ProductQueryDto): ApiPayload<Product[]> {
    const filtered = this.applyFilters(
      this.repository.getProducts().filter((product) => product.isActive),
      query,
    );
    const page = query.page;
    const limit = query.limit;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      paging: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      },
    };
  }

  findAllForAdmin(query: ProductQueryDto): ApiPayload<Product[]> {
    const filtered = this.applyFilters(this.repository.getProducts(), query);
    const page = query.page;
    const limit = query.limit;
    const start = (page - 1) * limit;

    return {
      data: filtered.slice(start, start + limit),
      paging: {
        page,
        limit,
        total: filtered.length,
        totalPages: Math.ceil(filtered.length / limit),
      },
    };
  }

  findDetail(id: number) {
    return this.repository.findProductById(id);
  }

  findSimilar(id: number): Product[] {
    const product = this.repository.findProductById(id);
    return this.repository
      .getProducts()
      .filter(
        (item) =>
          item.id !== id &&
          item.isActive &&
          (item.categoryId === product.categoryId ||
            item.tags.some((tag) => product.tags.includes(tag))),
      )
      .slice(0, 8);
  }

  create(dto: CreateProductDto) {
    return this.repository.createProduct(dto);
  }

  update(id: number, dto: UpdateProductDto) {
    return this.repository.updateProduct(id, dto);
  }

  private applyFilters(products: Product[], query: ProductQueryDto): Product[] {
    return products.filter((product) => {
      const matchedCategory = query.categoryId
        ? product.categoryId === query.categoryId
        : true;
      const matchedType = query.type ? product.types.includes(query.type) : true;
      const matchedColor = query.color
        ? product.colors.includes(query.color)
        : true;
      const matchedMinPrice = query.minPrice
        ? product.basePrice >= query.minPrice
        : true;
      const matchedMaxPrice = query.maxPrice
        ? product.basePrice <= query.maxPrice
        : true;
      const matchedKeyword = query.keyword
        ? product.name.toLowerCase().includes(query.keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(query.keyword.toLowerCase())
        : true;

      return (
        matchedCategory &&
        matchedType &&
        matchedColor &&
        matchedMinPrice &&
        matchedMaxPrice &&
        matchedKeyword
      );
    });
  }
}
