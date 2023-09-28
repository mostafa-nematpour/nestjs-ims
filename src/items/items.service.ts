import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Price } from './prices/entities/price.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item: Item = await this.itemRepository.save(createItemDto);

    const price: Price = new Price();
    price.item_name = item.name;
    price.item_price = item.sale_price;
    price.item = item;
    await this.priceRepository.save(price);
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    
    return `This action updates a #${id} item`;
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
