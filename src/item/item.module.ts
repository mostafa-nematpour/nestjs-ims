import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CategoriesModule],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [TypeOrmModule],
})
export class ItemModule {}
