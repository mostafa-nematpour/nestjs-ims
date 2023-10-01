import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import {
  Length,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @Length(4, 50)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  @Length(1, 30)
  status: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  number: number;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(100_000_000_000)
  cost_price: number;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(100_000_000_000)
  sale_price: number;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
