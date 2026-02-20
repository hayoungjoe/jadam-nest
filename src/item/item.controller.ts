import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async createItem(@Body() createItemDto: CreateItemDto) {
    const newItem = await this.itemService.createItem(createItemDto);
    return {
      data: newItem,
      message: '아이템 생성 성공',
    };
  }

  @Get()
  async getItems(
    @Query('raw_mt_tp_cd') raw_mt_tp_cd: string = 'ALL',
    @Query('item_nm') item_nm?: string,
  ) {
    const items = await this.itemService.getItems(raw_mt_tp_cd, item_nm);
    return {
      data: items,
      message: '아이템 목록 조회 성공',
    };
  }

  @Get(':item_cd')
  async getItemByCode(@Param('item_cd') item_cd: string) {
    const item = await this.itemService.getItemByCode(item_cd);
    return {
      data: item,
      message: '아이템 조회 성공',
    };
  }

  @Put(':item_cd')
  async updateItem(
    @Param('item_cd') item_cd: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    const updated = await this.itemService.updateItem(item_cd, updateItemDto);
    return {
      data: updated,
      message: '아이템 수정 성공',
    };
  }

  @Patch(':item_cd')
  async deleteItem(@Param('item_cd') item_cd: string) {
    const deletedItem = await this.itemService.deleteItem(item_cd);
    return {
      data: deletedItem,
      message: '아이템 삭제 성공',
    };
  }
}
