import { Module } from '@nestjs/common';
import { FlowerStoreRepository } from './flower-store.repository';

@Module({
  providers: [FlowerStoreRepository],
  exports: [FlowerStoreRepository],
})
export class SeedModule {}
