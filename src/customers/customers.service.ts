import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '@app/customers/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(Customer) private customersRepository: Repository<Customer>) {}

  async create(customerDto: CreateCustomerDto) : Promise<Customer> {
    try {
      const { name, phone } = customerDto

      const customer = new Customer()
      customer.name = name
      customer.phone = phone

      return await this.customersRepository.save(customer)
    } catch (error) {
      throw error;
    }
  }

  async find() : Promise<Customer[]> {
    try {
      return await this.customersRepository.find();
    } catch (error) {
      throw error;
    }
  }
}
