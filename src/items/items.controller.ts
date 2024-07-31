import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

import { ItemsService } from '@app/items/items.service';
import { CreateItemDto } from '@app/items/dto/create-item.dto';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @ApiOkResponse({
    description: 'Return list of items',
  })
  @Get('')
  async listItems() {
    return await this.itemsService.find();
  }

  @ApiCreatedResponse({
    description: 'Return created item',
  })
  @ApiBody({
    type: CreateItemDto,
    description: 'JSON structure for trip object',
  })
  @Post('create')
  async createItem(@Body() itemDto: CreateItemDto) {
    return await this.itemsService.create(itemDto)
  }

  @ApiCreatedResponse({
    description: 'Return one item',
  })
  @ApiParam({
    name: 'id',
    type: 'number'
  })
  @Get('/:id')
  async getItem(@Param() itemQuery: { id: number }) {
    return await this.itemsService.findOne(itemQuery.id)
  }
}
