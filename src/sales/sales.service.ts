import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Sale } from '@app/sales/sale.entity';
import { CreateSaleDto } from '@app/sales/dto/create-sale.dto';
import { SaleDetailsService } from '@app/sale-details/sale-details.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
    private dataSource: DataSource,
    private detailsRepository: SaleDetailsService
  ) {}

  async find(): Promise<Sale[]> {
    try {
      return await this.salesRepository.find({
        relations: ['saleDetail', 'saleDetail.item'],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(saleDto: CreateSaleDto) {
    try {
      const {
        date,
        discount,
        subtotal,
        customerId,
        shippingCost,
        totalPayment,
        details,
      } = saleDto;

      const sale = new Sale();
      sale.code = await this.generateSalesCode();
      sale.date = date;
      sale.discount = discount;
      sale.subtotal = subtotal;
      sale.customerId = customerId;
      sale.shippingCost = shippingCost;
      sale.totalPayment = totalPayment;

      const savedSale = await this.salesRepository.save(sale);

      if (savedSale) {
        await this.detailsRepository.create(savedSale.id, details);
      }

      return savedSale;
    } catch (error) {
      throw error;
    }
  }

  async generateSalesCode() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const sequenceResult = await this.dataSource.query(
      "SELECT nextval('sales_code_sequence')"
    );
    const sequence = String(sequenceResult[0].nextval!).padStart(4, '0');

    return `${year}${month}-${sequence}`;
  }
}
