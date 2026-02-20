// 또는 prisma 생성물에 따라 import 경로가 다를 수 있음 (아래 해결 2 참고)

import { Decimal } from '@prisma/client/runtime/client';

export class ItemResponseDto {
  item_cd: string;

  item_nm: string | null;
  raw_mt_tp_cd: string | null;
  raw_mt_origin_tp_cd: string | null;
  item_tp_cd: string | null;
  item_pkg_cd: string | null;
  item_pkg_qty: number | null;
  identification_cd: string | null;
  item_brix: Decimal | null;
  del_yn: string | null;
  created_at: Date | null;
}
