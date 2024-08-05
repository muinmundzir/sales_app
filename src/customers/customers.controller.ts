import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiQuery({
    name: 'query',
    description: 'Search sales by customer name or transaction code',
    required: false,
  })
  @Get('')
  async listCustomers(
    @Query() queryParams: { query: string }
  ): Promise<Customer[]> {
    return await this.customersService.find(queryParams.query);
  }

  @ApiCreatedResponse({
    description: 'Return created item',
  })
  @ApiBody({
    type: CreateCustomerDto,
    description: 'JSON structure for customer object',
  })
  @Post('create')
  async createCustomer(@Body() itemDto: CreateCustomerDto): Promise<Customer> {
    return await this.customersService.create(itemDto);
  }

  @ApiOkResponse({
    description: 'Return one customer',
  })
  @ApiNotFoundResponse({
    description: 'Customer with inserted ID not found',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Get('/:id')
  async getItem(@Param() itemQuery: { id: number }): Promise<Customer> {
    return await this.customersService.findOne(itemQuery.id);
  }

  @ApiOkResponse({
    description: 'Return deleted customer',
  })
  @ApiNotFoundResponse({
    description: 'Customer with inserted ID not found',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Delete('/:id')
  async deleteCustomer(
    @Param() customerParam: { id: number }
  ): Promise<Customer> {
    return await this.customersService.delete(customerParam.id);
  }
}
