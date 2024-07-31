import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Item } from '@app/items/item.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectRepository(Item) private itemsRepository: Repository<Item>) {

  }

  async find() {
    try {
      return await this.itemsRepository.find();
    } catch (error) {
       throw error 
    }
  }
}
