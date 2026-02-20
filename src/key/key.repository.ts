import { Injectable } from '@nestjs/common';
import { tb_key000 } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KeyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateKeySeqByMainCd(main_cd: string): Promise<tb_key000> {
    return await this.prisma.tb_key000.update({
      where: { main_cd },
      data: {
        last_seq_no: { increment: 1 },
      },
    });
  }
}
