import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service';
import { PersistenceModule } from '../persistence/persistence.module';

@Module({
  imports: [PersistenceModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule { }
