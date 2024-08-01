import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SaleDetail } from '@app/sale-details/sale-detail.entity';
import { CreateDetailsDto } from '@app/sale-details/dto/create-details.dto';

@Injectable()
export class SaleDetailsService {
  constructor(
    @InjectRepository(SaleDetail)
    private detailsRepository: Repository<SaleDetail>
  ) {}

  async create(saleId: number, detailsDto: CreateDetailsDto[]) {
    try {
      const saleDetails = detailsDto.map((detail) => {
        const saleDetail = new SaleDetail();
        saleDetail.saleId = saleId;
        saleDetail.itemId = detail.itemId;
        saleDetail.price = detail.price;
        saleDetail.quantity = detail.quantity;
        saleDetail.discountPercentage = detail.discountPercentage;
        saleDetail.discountAmount = detail.discountAmount;
        saleDetail.discountPrice = detail.discountPrice;
        saleDetail.totalAmount = detail.totalAmount;

        return saleDetail;
      });

      await this.detailsRepository.save(saleDetails);
    } catch (error) {
      throw error;
    }
  }
}
