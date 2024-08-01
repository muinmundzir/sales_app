import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSequence1722494632605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE sales_code_sequence START WITH 1 INCREMENT BY 1;`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SEQUENCE sales_code_sequence;`);
  }
}
