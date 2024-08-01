import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
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
  async getAll(): Promise<Sale[]> {
    return await this.salesService.find();
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
