import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoriesModule } from './categories/categories.module';
import { PricesModule } from './prices/prices.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CategoriesModule, PricesModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [TypeOrmModule],
})
export class ItemModule {}
