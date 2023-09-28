import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    createItemDto.number = 10;
    return createItemDto;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findOne(id: number): Promise<Item | null> {
    return this.itemRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
