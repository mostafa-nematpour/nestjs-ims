import { Item } from 'src/items/entities/item.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  itemPrice: number;

  @ManyToOne(() => Item, (item) => item.prices)
  item: Item;
}
