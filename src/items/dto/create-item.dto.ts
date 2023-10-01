import {
  Length,
  IsInt,
  Min,
  Max,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  status: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(1000)
  number: number;

  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @Max(100_000_000_000)
  cost_price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @Max(100_000_000_000)
  sale_price: number;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @IsOptional()
  @IsArray()
  categories_id: number[];
}
