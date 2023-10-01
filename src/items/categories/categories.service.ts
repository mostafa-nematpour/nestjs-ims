import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parent_id) {
      const parent = await this.categoryRepository.findOne({
        where: { id: createCategoryDto.parent_id },
      });
      if (!parent) {
        throw new HttpException('parent not found', HttpStatus.BAD_REQUEST);
      }
    }
    const category = await this.categoryRepository.save(createCategoryDto);

    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    const nestedCategories = categories.map((category) => {
      return {
        ...category,
        children: categories.filter((c) => c.parent_id === category.id),
      };
    });
    // remove children from main list
    const topLevelCategories = nestedCategories.filter((c) => !c.parent_id);

    return topLevelCategories;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
