import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { In, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './prices/entities/price.entity';
import { Category } from './categories/entities/category.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item: Item = await this.itemRepository.save(createItemDto);

    if (createItemDto.categories_id) {
      const categories = await this.categoryRepository.findBy({
        id: In(createItemDto.categories_id),
      });

      item.categories = categories;
    }
    const price: Price = new Price();
    price.item_name = item.name;
    price.item_price = item.sale_price;
    price.item = item;
    await this.priceRepository.save(price);

    await this.itemRepository.save(item);

    const result = await this.itemRepository.findOne({
      relations: {
        categories: true,
        prices: true,
      },
      where: { id: item.id },
    });
    
    return result;
  }

  async update(updateItemDto: UpdateItemDto) {
    const item: Item = new Item();
    item.id = updateItemDto.id;

    // const item0: Item = /await this.itemRepository.findOne(item);
    return 'll';
  }

  findAll(): Promise<Item[]> {
    // return this.itemRepository.find({
    //   relations: {
    //     prices: true,
    //   },
    // });
    return this.itemRepository.find();
  }

  findOne(id: number): Promise<Item | null> {
    return this.itemRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
