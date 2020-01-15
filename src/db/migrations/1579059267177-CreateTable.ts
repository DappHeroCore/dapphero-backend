import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTable1579059267177 implements MigrationInterface {
    name = 'CreateTable1579059267177'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "account_subscription" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "account_id" integer, CONSTRAINT "PK_08568b4f059808520495b7544f7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "user_authtype_enum" AS ENUM('google', 'github')`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "authType" "user_authtype_enum" NOT NULL, "account_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "blockchain_identity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "publicKey" text NOT NULL, "blockchain_id" integer, "user_id" integer, CONSTRAINT "PK_e5c72d8cc59ff95befc47d79a80" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "blockchain_protocol_enum" AS ENUM('ethereum', 'bitcoin')`, undefined);
        await queryRunner.query(`CREATE TABLE "blockchain" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "rpcEndpoint" text NOT NULL, "networkId" smallint NOT NULL, "protocol" "blockchain_protocol_enum" NOT NULL, CONSTRAINT "PK_e8d1216086807f2eb4cc145b3a2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "eth_contract_instance" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "address" text NOT NULL, "isLive" boolean NOT NULL, "abi" jsonb NOT NULL, "blockchain_id" integer, CONSTRAINT "PK_bb2eebfd90e09b928d937aece4a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "feature" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project_subscription" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "project_id" integer, CONSTRAINT "PK_910c551ce3d971c15c9521bc749" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "url" text NOT NULL, "name" text NOT NULL, "screenShotUri" text NOT NULL, "account_id" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "account" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_Version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "owner_id" integer, CONSTRAINT "REL_7e86daab9d155ec4cc3fd65445" UNIQUE ("owner_id"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "account_subscription" ADD CONSTRAINT "FK_340d24917908c61a601cad8b2e6" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "blockchain_identity" ADD CONSTRAINT "FK_cc21bb1c66a3286de663c4053a1" FOREIGN KEY ("blockchain_id") REFERENCES "blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "blockchain_identity" ADD CONSTRAINT "FK_aa0cbe27f470c018e8aa689dd49" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "eth_contract_instance" ADD CONSTRAINT "FK_4cb97d9848768eacfe961ae6193" FOREIGN KEY ("blockchain_id") REFERENCES "blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_subscription" ADD CONSTRAINT "FK_73e4972430eda8bb11b9108dd08" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_76eea9da615605bb68d1ffc995c" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_7e86daab9d155ec4cc3fd654454" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_7e86daab9d155ec4cc3fd654454"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_76eea9da615605bb68d1ffc995c"`, undefined);
        await queryRunner.query(`ALTER TABLE "project_subscription" DROP CONSTRAINT "FK_73e4972430eda8bb11b9108dd08"`, undefined);
        await queryRunner.query(`ALTER TABLE "eth_contract_instance" DROP CONSTRAINT "FK_4cb97d9848768eacfe961ae6193"`, undefined);
        await queryRunner.query(`ALTER TABLE "blockchain_identity" DROP CONSTRAINT "FK_aa0cbe27f470c018e8aa689dd49"`, undefined);
        await queryRunner.query(`ALTER TABLE "blockchain_identity" DROP CONSTRAINT "FK_cc21bb1c66a3286de663c4053a1"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f"`, undefined);
        await queryRunner.query(`ALTER TABLE "account_subscription" DROP CONSTRAINT "FK_340d24917908c61a601cad8b2e6"`, undefined);
        await queryRunner.query(`DROP TABLE "account"`, undefined);
        await queryRunner.query(`DROP TABLE "project"`, undefined);
        await queryRunner.query(`DROP TABLE "project_subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "feature"`, undefined);
        await queryRunner.query(`DROP TABLE "eth_contract_instance"`, undefined);
        await queryRunner.query(`DROP TABLE "blockchain"`, undefined);
        await queryRunner.query(`DROP TYPE "blockchain_protocol_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "blockchain_identity"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TYPE "user_authtype_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "account_subscription"`, undefined);
    }

}
