import { Controller, Get } from '@nestjs/common';

import { ItemsService } from '@app/items/items.service';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get('')
  async listItems() {
    return await this.itemsService.find();
  }
}
