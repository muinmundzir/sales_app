import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '@app/items/item.entity';
import { CreateItemDto } from '@app/items/dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private itemsRepository: Repository<Item>) {

  }

  async create(itemDto: CreateItemDto) {
    try {
      const { code, name, price } = itemDto
      
      const item = new Item()
      item.code = code;
      item.name = name;
      item.price = price;

      return await this.itemsRepository.save(item)
    } catch (error) {
      throw error;
    }
  }

  async find() {
    try {
      return await this.itemsRepository.find();
    } catch (error) {
       throw error 
    }
  }

  async findOne(itemId: number) {
    try {
      return await this.itemsRepository.findOneBy({ id: itemId });
    } catch (error) {
      throw error
    }
  }
}
