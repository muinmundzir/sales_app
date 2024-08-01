import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SalesService } from '@app/sales/sales.service';
import { SalesController } from '@app/sales/sales.controller';
import { Sale } from '@app/sales/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale])],
  providers: [SalesService],
  controllers: [SalesController],
})
export class SalesModule {}
