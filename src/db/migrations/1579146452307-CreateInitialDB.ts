import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateInitialDB1579146452307 implements MigrationInterface {
    name = 'CreateInitialDB1579146452307'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "blockchain_identity" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "public_key" character varying NOT NULL, "user_id" integer, "blockchain_id" integer, CONSTRAINT "PK_e5c72d8cc59ff95befc47d79a80" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "blockchain" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "rpcEndpoint" text NOT NULL, "networkID" smallint NOT NULL, "protocol" "blockchain_protocol_enum" NOT NULL, CONSTRAINT "PK_e8d1216086807f2eb4cc145b3a2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "eth_contract_instance" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "address" character varying NOT NULL, "is_live" boolean NOT NULL, "abi" jsonb NOT NULL, "blockchain_id" integer, "project_id" integer, CONSTRAINT "PK_bb2eebfd90e09b928d937aece4a" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project_subscription" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "projectId" integer, CONSTRAINT "PK_910c551ce3d971c15c9521bc749" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "feature" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "url" text, "name" text NOT NULL, "screenShotUri" text, "account_id" integer NOT NULL, "accountIdId" integer, "ownerId" integer, "accountId" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "authType" "user_authtype_enum" NOT NULL, "accountId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "account_subscription" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "accountId" integer, CONSTRAINT "PK_08568b4f059808520495b7544f7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "account" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "entity_version" integer NOT NULL, "id" SERIAL NOT NULL, "name" text NOT NULL, "ownerId" integer, CONSTRAINT "REL_72719f338bfbe9aa98f4439d2b" UNIQUE ("ownerId"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project_users_user" ("projectId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_198c78e84c3bcdb0dc182e6d1e0" PRIMARY KEY ("projectId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_9666c6dcd769c698bed4aa4bf5" ON "project_users_user" ("projectId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f8300efd87679e1e21532be980" ON "project_users_user" ("userId") `, undefined);
        await queryRunner.query(`CREATE TABLE "project_admins_user" ("projectId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0ef0cb176b09373ab45ece4e492" PRIMARY KEY ("projectId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_127bc624e85609248216881b31" ON "project_admins_user" ("projectId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_229a9bf17e39e707f371c051c2" ON "project_admins_user" ("userId") `, undefined);
        await queryRunner.query(`CREATE TABLE "project_features_feature" ("projectId" integer NOT NULL, "featureId" integer NOT NULL, CONSTRAINT "PK_69418b85f9c4ba9e102534460b7" PRIMARY KEY ("projectId", "featureId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_259499df8d55d8dca32ced2cbc" ON "project_features_feature" ("projectId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f887ac2a5f3defb03914513600" ON "project_features_feature" ("featureId") `, undefined);
        await queryRunner.query(`ALTER TABLE "blockchain_identity" ADD CONSTRAINT "FK_aa0cbe27f470c018e8aa689dd49" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "blockchain_identity" ADD CONSTRAINT "FK_cc21bb1c66a3286de663c4053a1" FOREIGN KEY ("blockchain_id") REFERENCES "blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "eth_contract_instance" ADD CONSTRAINT "FK_4cb97d9848768eacfe961ae6193" FOREIGN KEY ("blockchain_id") REFERENCES "blockchain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "eth_contract_instance" ADD CONSTRAINT "FK_1d066353886804b0b2901e9da6f" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_subscription" ADD CONSTRAINT "FK_98a910c4199a22d11c279ae1ecb" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_e8667e47162fac8f2755379a9e4" FOREIGN KEY ("accountIdId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_8d691f8d69acef59f4ed3a872c4" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "account_subscription" ADD CONSTRAINT "FK_01f361d5959a46c93b141606240" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_72719f338bfbe9aa98f4439d2b4" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_users_user" ADD CONSTRAINT "FK_9666c6dcd769c698bed4aa4bf55" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_users_user" ADD CONSTRAINT "FK_f8300efd87679e1e21532be9808" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_admins_user" ADD CONSTRAINT "FK_127bc624e85609248216881b316" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_admins_user" ADD CONSTRAINT "FK_229a9bf17e39e707f371c051c28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_features_feature" ADD CONSTRAINT "FK_259499df8d55d8dca32ced2cbce" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_features_feature" ADD CONSTRAINT "FK_f887ac2a5f3defb039145136007" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "project_features_feature" DROP CONSTRAINT "FK_f887ac2a5f3defb039145136007"`, undefined);
        await queryRunner.query(`ALTER TABLE "project_features_feature" DROP CONSTRAINT "FK_259499df8d55d8dca32ced2cbce"`, undefined);
        await queryRunner.query(`ALTER TABLE "project_admins_user" DROP CONSTRAINT "FK_229a9bf17e39e707f371c051c28"`, undefined);
        await queryRunner.query(`ALTER TABLE "project_admins_user" DROP CONSTRAINT "FK_127bc624e85609248216881b316"`, undefined);
        await queryRunner.query(`ALTER TABLE "project_users_user" DROP CONSTRAINT "FK_f8300efd87679e1e21532be9808"`, undefined);
        await queryRunner.query(`ALTER TABLE "project_users_user" DROP CONSTRAINT "FK_9666c6dcd769c698bed4aa4bf55"`, undefined);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_72719f338bfbe9aa98f4439d2b4"`, undefined);
        await queryRunner.query(`ALTER TABLE "account_subscription" DROP CONSTRAINT "FK_01f361d5959a46c93b141606240"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68d3c22dbd95449360fdbf7a3f1"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_8d691f8d69acef59f4ed3a872c4"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_e8667e47162fac8f2755379a9e4"`, undefined);
        await queryRunner.query(`ALTER TABLE "project_subscription" DROP CONSTRAINT "FK_98a910c4199a22d11c279ae1ecb"`, undefined);
        await queryRunner.query(`ALTER TABLE "eth_contract_instance" DROP CONSTRAINT "FK_1d066353886804b0b2901e9da6f"`, undefined);
        await queryRunner.query(`ALTER TABLE "eth_contract_instance" DROP CONSTRAINT "FK_4cb97d9848768eacfe961ae6193"`, undefined);
        await queryRunner.query(`ALTER TABLE "blockchain_identity" DROP CONSTRAINT "FK_cc21bb1c66a3286de663c4053a1"`, undefined);
        await queryRunner.query(`ALTER TABLE "blockchain_identity" DROP CONSTRAINT "FK_aa0cbe27f470c018e8aa689dd49"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f887ac2a5f3defb03914513600"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_259499df8d55d8dca32ced2cbc"`, undefined);
        await queryRunner.query(`DROP TABLE "project_features_feature"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_229a9bf17e39e707f371c051c2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_127bc624e85609248216881b31"`, undefined);
        await queryRunner.query(`DROP TABLE "project_admins_user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f8300efd87679e1e21532be980"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_9666c6dcd769c698bed4aa4bf5"`, undefined);
        await queryRunner.query(`DROP TABLE "project_users_user"`, undefined);
        await queryRunner.query(`DROP TABLE "account"`, undefined);
        await queryRunner.query(`DROP TABLE "account_subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "project"`, undefined);
        await queryRunner.query(`DROP TABLE "feature"`, undefined);
        await queryRunner.query(`DROP TABLE "project_subscription"`, undefined);
        await queryRunner.query(`DROP TABLE "eth_contract_instance"`, undefined);
        await queryRunner.query(`DROP TABLE "blockchain"`, undefined);
        await queryRunner.query(`DROP TABLE "blockchain_identity"`, undefined);
    }

}
