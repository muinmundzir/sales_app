import { SaleDetail } from '@app/sale-details/sale-detail.entity';
import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  price: number;

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

  @OneToMany(() => SaleDetail, (details) => details.item)
  saleDetail: SaleDetail;

  @AfterLoad()
  async removeTimestamps() {
    delete this.createdAt;
    delete this.updatedAt;
  }
}
