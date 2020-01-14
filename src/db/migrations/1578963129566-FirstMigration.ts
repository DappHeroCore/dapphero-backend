import { MigrationInterface, QueryRunner } from 'typeorm'

export class FirstMigration1578963129566 implements MigrationInterface {
    name = 'FirstMigration1578963129566'

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`CREATE TYPE "account_subscription_role_enum" AS ENUM('admin', 'editor', 'ghost')`, undefined)
      await queryRunner.query(`CREATE TABLE "account_subscription" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "role" "account_subscription_role_enum" NOT NULL DEFAULT 'ghost', "accountId" integer, CONSTRAINT "PK_08568b4f059808520495b7544f7" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "blockchain" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "rpcEndpoint" text NOT NULL, "networkId" smallint NOT NULL, CONSTRAINT "PK_e8d1216086807f2eb4cc145b3a2" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "eth_contract_instance" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "address" text NOT NULL, "isLive" boolean NOT NULL, "blockchainId" integer, CONSTRAINT "PK_bb2eebfd90e09b928d937aece4a" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "feature" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "wallet" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "publicKey" text NOT NULL, "blockchainId" integer, "userId" integer, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "user_url" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "userId" integer, CONSTRAINT "PK_8644584d3620c8fd95111270b75" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TYPE "user_authtype_enum" AS ENUM('google', 'github')`, undefined)
      await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "firstName" text NOT NULL, "lastName" text NOT NULL, "email" text NOT NULL, "authType" "user_authtype_enum" NOT NULL, "accountId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "project_subscription" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "projectId" integer, CONSTRAINT "PK_910c551ce3d971c15c9521bc749" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "project" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "url" text NOT NULL, "name" text NOT NULL, "screenShotUri" text NOT NULL, "accountId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "account" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`CREATE TABLE "eth_contract_definition" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "entityVersion" integer NOT NULL, "id" SERIAL NOT NULL, "abi" jsonb NOT NULL, CONSTRAINT "PK_f093d6e11e11ecb27e514b99448" PRIMARY KEY ("id"))`, undefined)
      await queryRunner.query(`ALTER TABLE "account_subscription" ADD CONSTRAINT "FK_01f361d5959a46c93b141606240" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined)
      await queryRunner.query(`ALTER TABLE "eth_contract_instance" ADD CONSTRAINT "FK_c7916c19105c43eb80310e7b8f7" FOREIGN KEY ("blockchainId") REFERENCES "blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined)
      await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_399d76cdcc05fe9c70e4b236314" FOREIGN KEY ("blockchainId") REFERENCES "blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined)
      await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined)
      await queryRunner.query(`ALTER TABLE "user_url" ADD CONSTRAINT "FK_44c91da328f0e8292edb2c7ed73" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined)
      await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined)
      await queryRunner.query(`ALTER TABLE "project_subscription" ADD CONSTRAINT "FK_98a910c4199a22d11c279ae1ecb" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined)
      await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_8d691f8d69acef59f4ed3a872c4" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_8d691f8d69acef59f4ed3a872c4"`, undefined)
      await queryRunner.query(`ALTER TABLE "project_subscription" DROP CONSTRAINT "FK_98a910c4199a22d11c279ae1ecb"`, undefined)
      await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1"`, undefined)
      await queryRunner.query(`ALTER TABLE "user_url" DROP CONSTRAINT "FK_44c91da328f0e8292edb2c7ed73"`, undefined)
      await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`, undefined)
      await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_399d76cdcc05fe9c70e4b236314"`, undefined)
      await queryRunner.query(`ALTER TABLE "eth_contract_instance" DROP CONSTRAINT "FK_c7916c19105c43eb80310e7b8f7"`, undefined)
      await queryRunner.query(`ALTER TABLE "account_subscription" DROP CONSTRAINT "FK_01f361d5959a46c93b141606240"`, undefined)
      await queryRunner.query(`DROP TABLE "eth_contract_definition"`, undefined)
      await queryRunner.query(`DROP TABLE "account"`, undefined)
      await queryRunner.query(`DROP TABLE "project"`, undefined)
      await queryRunner.query(`DROP TABLE "project_subscription"`, undefined)
      await queryRunner.query(`DROP TABLE "user"`, undefined)
      await queryRunner.query(`DROP TYPE "user_authtype_enum"`, undefined)
      await queryRunner.query(`DROP TABLE "user_url"`, undefined)
      await queryRunner.query(`DROP TABLE "wallet"`, undefined)
      await queryRunner.query(`DROP TABLE "feature"`, undefined)
      await queryRunner.query(`DROP TABLE "eth_contract_instance"`, undefined)
      await queryRunner.query(`DROP TABLE "blockchain"`, undefined)
      await queryRunner.query(`DROP TABLE "account_subscription"`, undefined)
      await queryRunner.query(`DROP TYPE "account_subscription_role_enum"`, undefined)
    }

}
