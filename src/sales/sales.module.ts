import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesService } from '@app/sales/sales.service';
import { SalesController } from '@app/sales/sales.controller';
import { Sale } from '@app/sales/sale.entity';
import { SaleDetailsModule } from '@app/sale-details/sale-details.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sale]), SaleDetailsModule],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
