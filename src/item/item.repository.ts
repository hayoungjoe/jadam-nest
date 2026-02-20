import { Injectable } from '@nestjs/common';
import { tb_item000 } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createItem(item_cd: string, createItemDto: CreateItemDto) {
    return this.prisma.tb_item000.create({
      data: { item_cd, ...createItemDto },
    });
  }

  async findAll(raw_mt_tp_cd: string, item_nm?: string): Promise<tb_item000[]> {
    const where: any = {};

    if (item_nm) {
      where.item_nm = {
        contains: item_nm,
        mode: 'insensitive',
      };
    }

    // ALL?�면 조건 ???�음
    if (raw_mt_tp_cd && raw_mt_tp_cd !== 'ALL') {
      where.raw_mt_tp_cd = {
        contains: raw_mt_tp_cd,
        mode: 'insensitive',
      };
    }

    return this.prisma.tb_item000.findMany({ where });
  }

  async getItemByCode(item_cd: string) {
    return this.prisma.tb_item000.findUnique({
      where: {
        item_cd,
      },
    });
  }

  async updateItemByCode(item_cd: string, updateItemDto: UpdateItemDto) {
    return this.prisma.tb_item000.update({
      where: {
        item_cd,
      },
      data: updateItemDto,
    });
  }

  async deleteItem(item_cd: string) {
    return this.prisma.tb_item000.update({
      where: { item_cd },
      data: {
        del_yn: 'Y',
      },
    });
  }
}
