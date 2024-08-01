import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sale } from '@app/sales/sale.entity';
import { CreateSaleDto } from '@app/sales/dto/create-sale.dto';
import { SaleDetailsService } from '@app/sale-details/sale-details.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>,
    private detailsRepository: SaleDetailsService
  ) {}

  async find(): Promise<Sale[]> {
    try {
      return await this.salesRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async create(saleDto: CreateSaleDto) {
    try {
      const {
        code,
        date,
        discount,
        subtotal,
        customerId,
        shippingCost,
        totalPayment,
        details,
      } = saleDto;

      const sale = new Sale();
      sale.code = code;
      sale.date = date;
      sale.discount = discount;
      sale.subtotal = subtotal;
      sale.customerId = customerId;
      sale.shippingCost = shippingCost;
      sale.totalPayment = totalPayment;

      const savedSale = await this.salesRepository.save(saleDto);

      if (savedSale) {
        await this.detailsRepository.create(savedSale.id, details);
      }

      return savedSale;
    } catch (error) {
      throw error;
    }
  }
}
