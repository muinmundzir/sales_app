import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CreateSaleDto } from '@app/sales/dto/create-sale.dto';
import { Sale } from '@app/sales/sale.entity';
import { SalesService } from '@app/sales/sales.service';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @ApiOkResponse({
    description: 'Return list of sales',
  })
  @Get('')
  @ApiQuery({
    name: 'query',
    description: 'Search sales by customer name or transaction code',
    required: false,
  })
  async getAll(@Query() queryParams: { query: string }): Promise<Sale[]> {
    return await this.salesService.find(queryParams.query);
  }

  @ApiCreatedResponse({
    description: 'Return created sale',
  })
  @ApiBody({
    type: CreateSaleDto,
    description: 'JSON structure for sale object',
  })
  @Post('create')
  async createSale(@Body() saleDto: CreateSaleDto) {
    return await this.salesService.create(saleDto);
  }
}
