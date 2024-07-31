import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '@app/customers/customer.entity';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';

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

  async findOne(customerId: number) : Promise<Customer> {
    try {
      const customer = await this.customersRepository.findOneBy({ id: customerId });

      if(!customer) throw new NotFoundException('Customer not found')

      return customer
    } catch (error) {
      throw error;
    }
  }
}
