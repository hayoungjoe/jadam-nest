import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemRepository } from './item.repository';
import { KeyService } from './../key/key.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly keyService: KeyService,
  ) {}

  async createItem(createItemDto: CreateItemDto) {
    const updatedKeySeq = await this.keyService.updateKeySeq('ITEM_CD');
    const { cd_prefix, last_seq_no } = updatedKeySeq;

    const newItemCode = `${cd_prefix}${String(last_seq_no).padStart(3, '0')}`;
    return this.itemRepository.createItem(newItemCode, createItemDto);
  }

  async getItems(raw_mt_tp_cd: string, item_nm?: string) {
    return this.itemRepository.findAll(raw_mt_tp_cd, item_nm);
  }

  async getItemByCode(item_cd: string) {
    return await this.itemRepository.getItemByCode(item_cd);
  }

  async updateItem(item_cd: string, updateItemDto: UpdateItemDto) {
    return await this.itemRepository.updateItemByCode(item_cd, updateItemDto);
  }

  async deleteItem(item_cd: string) {
    return this.itemRepository.deleteItem(item_cd);
  }
}
