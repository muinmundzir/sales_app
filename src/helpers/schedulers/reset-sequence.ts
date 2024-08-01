import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DataSource } from 'typeorm';

@Injectable()
export class SequenceResetService {
  constructor(private dataSource: DataSource) {}

  @Cron('0 0 1 * *')
  async handleCroTimeoutn() {
    await this.dataSource.query(
      'ALTER SEQUENCE sales_code_sequence RESTART WITH 1;'
    );
    Logger.log('Sequence reset at', new Date());
  }
}
