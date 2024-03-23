import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipBetweenPostsAndUser1711210625740 implements MigrationInterface {
    name = 'AddRelationshipBetweenPostsAndUser1711210625740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_63078ada3266846e539d930b1be"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "REL_c4f9a7bd77b489e711277ee598"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "REL_63078ada3266846e539d930b1b"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_63078ada3266846e539d930b1be" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_63078ada3266846e539d930b1be"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "REL_63078ada3266846e539d930b1b" UNIQUE ("community_id")`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "REL_c4f9a7bd77b489e711277ee598" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_63078ada3266846e539d930b1be" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
