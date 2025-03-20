import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from '@dtr/record/entities';

export class RecordStore {
  constructor(
    @InjectRepository(Record) private recordRepo: Repository<Record>,
  ) {}

  async create(newRecord: Record): Promise<Record> {
    const manager = this.recordRepo.manager;

    return await manager.transaction(async (transactionalEntityManager) => {
      return transactionalEntityManager.save(newRecord);
    });
  }

  async getAll(
    userId: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<Record[]> {
    const qB = this.recordRepo.createQueryBuilder('record');
    qB.select('record.date', 'date');
    qB.addSelect('json_agg(record.time ORDER BY record.time)', 'times');
    qB.where(`record.userId =: userId`, { userId });
    qB.andWhere(`record.date BETWEEN :begin AND :end`, {
      begin: dateFrom,
      end: dateTo,
    });

    qB.groupBy('record.date');
    qB.orderBy('record.date', 'DESC');

    return await qB.getMany();
  }
}
