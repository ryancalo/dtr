import { Record } from '@dtr/record/entities';
import { RecordStore } from './record.store';

export class RecordService {
  constructor(private recordStore: RecordStore) {}

  async create(newRecord: Record): Promise<Record> {
    return this.recordStore.create(newRecord);
  }
}
