import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1670084143958 implements MigrationInterface {
    name = 'initial1670084143958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Api key
        await queryRunner.query(`CREATE TYPE "public"."api_key_audiences_enum" AS ENUM('GENERAL', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "api_key" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client" character varying NOT NULL, "description" character varying NOT NULL, "key" character varying NOT NULL, "audience" "public"."api_key_audiences_enum" NOT NULL DEFAULT 'GENERAL', CONSTRAINT "UQ_fb080786c16de6ace7ed0b69f7d" UNIQUE ("key"), CONSTRAINT "PK_b1bd840641b8acbaad89c3d8d11" PRIMARY KEY ("id"))`);

        // Blacklist IP
        await queryRunner.query(`CREATE TABLE "blacklist_ip" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ip" character varying NOT NULL, CONSTRAINT "UQ_c0db2a7e2407e50770f3c590996" UNIQUE ("ip"), CONSTRAINT "PK_8709b6d8a0c8cbfd0d805a3f101" PRIMARY KEY ("id"))`);

        // Blacklist User
        await queryRunner.query(`CREATE TABLE "blacklist_user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "reason" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "UQ_6de082a6820994ccb2520774961" UNIQUE ("userId"), CONSTRAINT "PK_737fd64e4d088f113eae9a232cd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blacklist_user"`);
        await queryRunner.query(`DROP TABLE "blacklist_ip"`);
        await queryRunner.query(`DROP TABLE "api_key"`);
        await queryRunner.query(`DROP TYPE "public"."api_key_audiences_enum"`);
    }

}
