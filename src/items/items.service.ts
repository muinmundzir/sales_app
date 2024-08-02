import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ILike, Repository } from 'typeorm'

import { Item } from '@app/items/item.entity'
import { CreateItemDto } from '@app/items/dto/create-item.dto'

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemsRepository: Repository<Item>
  ) {}

  async create(itemDto: CreateItemDto): Promise<Item> {
    try {
      const { code, name, price } = itemDto

      const item = new Item()
      item.code = code
      item.name = name
      item.price = price

      return await this.itemsRepository.save(item)
    } catch (error) {
      throw error
    }
  }

  async find(query: string): Promise<Item[]> {
    try {
      if (query !== undefined && query !== '') {
        return await this.itemsRepository.find({
          where: [
            {
              code: ILike(`%${query}`),
            },
            {
              name: ILike(`%${query}%`),
            },
          ],
        });
      }

      return await this.itemsRepository.find()
    } catch (error) {
      throw error
    }
  }

  async findOne(itemId: number): Promise<Item> {
    try {
      const item = await this.itemsRepository.findOneBy({ id: itemId })

      if (!item) throw new NotFoundException('Item not found')

      return item
    } catch (error) {
      throw error
    }
  }

  async delete(itemId: number): Promise<Item> {
    try {
      const item = await this.findOne(itemId)

      return await this.itemsRepository.remove(item)
    } catch (error) {
      throw error
    }
  }
}
