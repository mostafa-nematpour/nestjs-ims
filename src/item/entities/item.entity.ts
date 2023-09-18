import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
