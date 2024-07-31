import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { CustomersService } from '@app/customers/customers.service';
import { Customer } from '@app/customers/customer.entity';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @ApiOkResponse({
    description: 'Return list of customers',
  })
  @Get('')
  async listCustomers(): Promise<Customer[]> {
    return await this.customersService.find();
  }

  @ApiCreatedResponse({
    description: 'Return created item',
  })
  @ApiBody({
    type: CreateCustomerDto,
    description: 'JSON structure for trip object',
  })
  @Post('create')
  async createItem(@Body() itemDto: CreateCustomerDto) : Promise<Customer> {
    return await this.customersService.create(itemDto)
  }

  @ApiOkResponse({
    description: 'Return one customer',
  })
  @ApiNotFoundResponse({
    description: 'Customer with inserted ID not found'
  })
  @ApiParam({
    name: 'id',
    type: 'number'
  })
  @Get('/:id')
  async getItem(@Param() itemQuery: { id: number }) : Promise<Customer> {
    return await this.customersService.findOne(itemQuery.id)
  }
}
