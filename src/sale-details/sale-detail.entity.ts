import { Sale } from '@app/sales/sale.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sale_details')
export class SaleDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sale_id' })
  saleId: number;

  @Column({ name: 'customer_id' })
  customerId: number;

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

  @OneToOne(() => Sale, (sale) => sale.saleDetail)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}
