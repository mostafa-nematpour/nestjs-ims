import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  status: string;

  @Column()
  number: string;

  @Column()
  image: string;

  @Column()
  costPrice: number;

  @Column()
  salePrice: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
