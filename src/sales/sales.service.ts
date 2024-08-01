import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sale } from '@app/sales/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>
  ) {}

  async find(): Promise<Sale[]> {
    try {
      return await this.salesRepository.find();
    } catch (error) {
      throw error;
    }
  }
}
