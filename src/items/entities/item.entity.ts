import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Price } from '../prices/entities/price.entity';

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

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Price, (price) => price.item)
  prices: Price[];
}
