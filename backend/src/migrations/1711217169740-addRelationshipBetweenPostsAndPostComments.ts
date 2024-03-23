import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationshipBetweenPostsAndPostComments1711217169740 implements MigrationInterface {
    name = 'AddRelationshipBetweenPostsAndPostComments1711217169740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_e8ffd07822f03f90f637b13cd59"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_8eb985b7bd35fd7bc760b6cbe8b"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "REL_e8ffd07822f03f90f637b13cd5"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "REL_8eb985b7bd35fd7bc760b6cbe8"`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_8eb985b7bd35fd7bc760b6cbe8b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_e8ffd07822f03f90f637b13cd59" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_e8ffd07822f03f90f637b13cd59"`);
        await queryRunner.query(`ALTER TABLE "post_comments" DROP CONSTRAINT "FK_8eb985b7bd35fd7bc760b6cbe8b"`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "REL_8eb985b7bd35fd7bc760b6cbe8" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "REL_e8ffd07822f03f90f637b13cd5" UNIQUE ("post_id")`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_8eb985b7bd35fd7bc760b6cbe8b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_comments" ADD CONSTRAINT "FK_e8ffd07822f03f90f637b13cd59" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
