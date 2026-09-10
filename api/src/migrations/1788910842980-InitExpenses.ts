import { MigrationInterface, QueryRunner } from "typeorm";

export class InitExpenses1788910842980 implements MigrationInterface {
    name = 'InitExpenses1788910842980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expenses" ALTER COLUMN "description" SET NOT NULL`);
    }

}
