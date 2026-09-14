import { MigrationInterface, QueryRunner } from "typeorm";

export class InitExpenses1789170361217 implements MigrationInterface {
    name = 'InitExpenses1789170361217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_94c3ceb17e3140abc9282c20610"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_49a0ca239d34e74fdc4e0625a78" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" DROP CONSTRAINT "FK_49a0ca239d34e74fdc4e0625a78"`);
        await queryRunner.query(`ALTER TABLE "expenses" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "expenses" ADD CONSTRAINT "FK_94c3ceb17e3140abc9282c20610" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
