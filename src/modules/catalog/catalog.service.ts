import { Injectable } from '@nestjs/common';
import { FlowerStoreRepository } from '../seed/flower-store.repository';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CatalogService {
  constructor(private readonly repository: FlowerStoreRepository) {}

  findAll() {
    return this.repository.getCategories();
  }

  create(dto: CreateCategoryDto) {
    return this.repository.createCategory(dto);
  }
}
