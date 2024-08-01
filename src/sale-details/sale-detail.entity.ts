import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Item } from '@app/items/item.entity';
import { Sale } from '@app/sales/sale.entity';

@Entity('sale_details')
export class SaleDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sale_id' })
  saleId: number;

  @Column({ name: 'item_id' })
  itemId: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column({ name: 'discount_percentage' })
  discountPercentage: number;

  @Column({ name: 'discount_amount' })
  discountAmount: number;

  @Column({ name: 'discount_price' })
  discountPrice: number;

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Sale, (sale) => sale.saleDetail)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @OneToOne(() => Item, (item) => item.saleDetail)
  @JoinColumn({ name: 'item_id' })
  item: Item;
}
