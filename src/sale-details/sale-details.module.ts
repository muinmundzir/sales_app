import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SaleDetailsController } from './sale-details.controller';
import { SaleDetailsService } from './sale-details.service';
import { SaleDetail } from './sale-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleDetail])],
  controllers: [SaleDetailsController],
  providers: [SaleDetailsService],
})
export class SaleDetailsModule {}
