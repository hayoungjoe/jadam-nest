import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ItemRepository } from './item.repository';
import { KeyModule } from 'src/key/key.module';

@Module({
  imports: [KeyModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
