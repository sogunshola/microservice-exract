import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1623405710155 implements MigrationInterface {
    name = 'InitialTables1623405710155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "charges" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "txRef" character varying NOT NULL, "flwRef" character varying NOT NULL, "amount" integer NOT NULL, "chargedAmount" character varying NOT NULL, "accountId" character varying NOT NULL, "currency" character varying NOT NULL, "processorResponse" character varying NOT NULL, "cardId" uuid NOT NULL, CONSTRAINT "PK_0c6feb10df0fa460714f8464dce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" character varying NOT NULL, "cardNumber" character varying NOT NULL, "cvv" character varying NOT NULL, "cardType" character varying NOT NULL, "expiryYear" character varying NOT NULL, "expiryMonth" character varying NOT NULL, "currency" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying, "token" character varying, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "charges" ADD CONSTRAINT "FK_3d350a254ed19b9eb414b02303f" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "charges" DROP CONSTRAINT "FK_3d350a254ed19b9eb414b02303f"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "charges"`);
    }

}
