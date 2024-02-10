import { MigrationInterface, QueryRunner } from "typeorm";

export class AddISDeletedColumnToPasswordReset1707598513626 implements MigrationInterface {
    name = 'AddISDeletedColumnToPasswordReset1707598513626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_resets" ADD "is_deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_resets" DROP COLUMN "is_deleted"`);
    }

}
