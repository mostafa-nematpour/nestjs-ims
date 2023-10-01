import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { In, Like, Repository } from 'typeorm';
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

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOne({
      where: { id: id },
      relations: {
        categories: true,
      },
    });

    if (!item) {
      // Not found
      throw new HttpException('id not found', HttpStatus.BAD_REQUEST);
    }
    //  categories update
    if (updateItemDto.categories_id) {
      const categories = await this.categoryRepository.findBy({
        id: In(updateItemDto.categories_id),
      });
      item.categories = categories;
      await this.itemRepository.save(item);
    }
    // prices update
    if (updateItemDto.sale_price !== undefined) {
      const price: Price = new Price();
      price.item_name = item.name;
      price.item_price = updateItemDto.sale_price;
      price.item = item;
      await this.priceRepository.save(price);
    }

    delete updateItemDto.categories_id;
    await this.itemRepository.update(id, updateItemDto);

    const result = await this.itemRepository.findOne({
      relations: {
        categories: true,
        prices: true,
      },
      where: { id: item.id },
    });

    return result;
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: {
        categories: true,
      },
    });
  }

  async findOne(id: number): Promise<Item | null> {
    const item = await this.itemRepository.findOne({
      relations: {
        categories: true,
        prices: true,
      },
      where: { id: id },
    });
    if (!item) {
      throw new HttpException('item not found', HttpStatus.BAD_REQUEST);
    }
    return item;
  }

  async remove(id: number) {
    const item = await this.itemRepository.findOne({
      where: { id: id },
    });

    if (!item) {
      // Not found
      throw new HttpException('item not found', HttpStatus.BAD_REQUEST);
    }

    await this.itemRepository.delete(id);

    return { statusCode: 200, message: 'successfully deleted' };
  }

  async search(keyword: string) {
    if (!keyword) {
      throw new HttpException('keyword not be empty', HttpStatus.BAD_REQUEST);
    }
    return await this.itemRepository.find({
      relations: {
        categories: true,
      },
      where: {
        name: Like(`%${keyword}%`),
      },
    });
  }
}
