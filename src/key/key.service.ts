import { Injectable } from '@nestjs/common';
import { KeyRepository } from './key.repository';

@Injectable()
export class KeyService {
  constructor(private readonly keyRepository: KeyRepository) {}

  async updateKeySeq(main_cd: string) {
    const updated = this.keyRepository.updateKeySeqByMainCd(main_cd);
    return updated;
  }
}
