import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { Customer } from '@app/customers/customer.entity';
import { CreateCustomerDto } from '@app/customers/dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>
  ) {}

  async create(customerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const { name, phone } = customerDto;

      const customer = new Customer();
      customer.name = name;
      customer.phone = phone;

      return await this.customersRepository.save(customer);
    } catch (error) {
      throw error;
    }
  }

  async find(query: string): Promise<Customer[]> {
    try {
      if (query !== undefined && query !== '') {
        return await this.customersRepository.find({
          where: [
            {
              name: ILike(`%${query}%`),
            },
          ],
          order: {
            createdAt: 'DESC',
          },
        });
      }

      return await this.customersRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(customerId: number): Promise<Customer> {
    try {
      const customer = await this.customersRepository.findOneBy({
        id: customerId,
      });

      if (!customer) throw new NotFoundException('Customer not found');

      return customer;
    } catch (error) {
      throw error;
    }
  }

  async delete(customerId: number): Promise<Customer> {
    try {
      const customer = await this.findOne(customerId);
      Logger.log(customer);

      return await this.customersRepository.remove(customer);
    } catch (error) {
      throw error;
    }
  }
}
