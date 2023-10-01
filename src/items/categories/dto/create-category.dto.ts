import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 40)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  parent_id: number;
}
