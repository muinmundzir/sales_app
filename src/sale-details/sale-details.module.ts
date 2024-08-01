import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SaleDetailsController } from '@app/sale-details/sale-details.controller';
import { SaleDetailsService } from '@app/sale-details/sale-details.service';
import { SaleDetail } from '@app/sale-details/sale-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleDetail])],
  controllers: [SaleDetailsController],
  providers: [SaleDetailsService],
  exports: [SaleDetailsService],
})
export class SaleDetailsModule {}
