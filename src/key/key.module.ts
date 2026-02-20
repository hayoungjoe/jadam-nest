import { Module } from '@nestjs/common';
import { KeyService } from './key.service';
import { KeyRepository } from './key.repository';

@Module({
  providers: [KeyService, KeyRepository],
  exports: [KeyService],
})
export class KeyModule {}
