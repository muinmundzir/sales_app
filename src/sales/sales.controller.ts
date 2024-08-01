import { Controller, Get } from '@nestjs/common';

import { SalesService } from '@app/sales/sales.service';
import { Sale } from '@app/sales/sale.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @ApiOkResponse({
    description: 'Return list of sales',
  })
  @Get('')
  async getAll(): Promise<Sale[]> {
    return await this.salesService.find();
  }
}
