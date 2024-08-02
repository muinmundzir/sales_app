import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { ItemsService } from '@app/items/items.service';
import { CreateItemDto } from '@app/items/dto/create-item.dto';
import { Item } from '@app/items/item.entity';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOkResponse({
    description: 'Return list of items',
  })
  @ApiQuery({
    name: 'query',
    description: 'Search item by name or code',
    required: false,
  })
  @Get('')
  async listItems(@Query() queryParams: { query: string }): Promise<Item[]> {
    return await this.itemsService.find(queryParams.query);
  }

  @ApiCreatedResponse({
    description: 'Return created item',
  })
  @ApiBody({
    type: CreateItemDto,
    description: 'JSON structure for item object',
  })
  @Post('create')
  async createItem(@Body() itemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(itemDto);
  }

  @ApiOkResponse({
    description: 'Return one item',
  })
  @ApiNotFoundResponse({
    description: 'Item with inserted ID not found',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Get('/:id')
  async getItem(@Param() itemQuery: { id: number }): Promise<Item> {
    return await this.itemsService.findOne(itemQuery.id);
  }

  @ApiOkResponse({
    description: 'Return deleted item',
  })
  @ApiNotFoundResponse({
    description: 'Item with inserted ID not found',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @Delete('/:id')
  async deleteItem(@Param() itemParam: { id: number }): Promise<Item> {
    return await this.itemsService.delete(itemParam.id);
  }
}
