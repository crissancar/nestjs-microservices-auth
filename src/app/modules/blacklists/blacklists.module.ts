import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { blacklistsConfig } from './config/blacklists.config';
import { BlacklistIPEntity } from './ip/persistence/blacklist-ip.entity';
import { TypeOrmBlacklistIPRepository } from './ip/persistence/typeorm-blacklist-ip.repository';
import { BlacklistIPChecker } from './ip/services/blacklist-ip-checker.service';
import { BlacklistUserEntity } from './user/persistence/blacklist-user.entity';
import { TypeOrmBlacklistUserRepository } from './user/persistence/typeorm-blacklist-user.repository';
import { BlacklistUserChecker } from './user/services/blacklist-user-checker.service';

const { repositoryInterface: blacklistIPRepositoryInterface } = blacklistsConfig.ip.repository;
const { repositoryInterface: blacklistUserRepositoryInterface } = blacklistsConfig.user.repository;

@Module({
	imports: [TypeOrmModule.forFeature([BlacklistIPEntity, BlacklistUserEntity])],
	providers: [
		BlacklistIPChecker,
		BlacklistUserChecker,
		{ provide: blacklistIPRepositoryInterface, useClass: TypeOrmBlacklistIPRepository },
		{ provide: blacklistUserRepositoryInterface, useClass: TypeOrmBlacklistUserRepository },
	],
	exports: [BlacklistIPChecker, BlacklistUserChecker],
})
export class BlacklistsModule {}
