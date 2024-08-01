import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Customer } from '@app/customers/customer.entity';
import { SaleDetail } from '@app/sale-details/sale-detail.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({
    type: 'timestamp',
  })
  date: Date;

  @Column()
  subtotal: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column()
  discount: number;

  @Column({ name: 'shipping_cost' })
  shippingCost: number;

  @Column({ name: 'total_payment' })
  totalPayment: number;

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

  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer[];

  @OneToMany(() => SaleDetail, (details) => details.sale)
  saleDetail: SaleDetail[];
}
