import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  item_nm: string;

  @IsString()
  raw_mt_tp_cd: string;

  @IsString()
  raw_mt_origin_tp_cd: string;

  @IsString()
  item_tp_cd: string;

  @IsString()
  item_pkg_cd: string;

  @IsInt()
  @Type(() => Number) //Number 생성자를 이용하여 number 타입으로 변환
  item_pkg_qty: number;

  @IsString()
  identification_cd: string;

  @IsNumber()
  @Type(() => Number)
  item_brix: number;
}
