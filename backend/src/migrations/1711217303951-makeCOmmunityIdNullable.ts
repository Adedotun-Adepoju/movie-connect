import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeCOmmunityIdNullable1711217303951 implements MigrationInterface {
    name = 'MakeCOmmunityIdNullable1711217303951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_63078ada3266846e539d930b1be"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "community_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_63078ada3266846e539d930b1be" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_63078ada3266846e539d930b1be"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "community_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_63078ada3266846e539d930b1be" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
