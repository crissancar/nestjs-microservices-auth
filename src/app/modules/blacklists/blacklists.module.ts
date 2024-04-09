import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { blacklistsConfig } from './config/blacklists.config';
import { BlacklistIPChecker } from './ip/application/services/blacklist-ip-checker.service';
import { BlacklistIPEntity } from './ip/infrastructure/persistence/blacklist-ip.entity';
import { TypeOrmBlacklistIPRepository } from './ip/infrastructure/persistence/typeorm-blacklist-ip.repository';
import { BlacklistUserChecker } from './user/application/services/blacklist-user-checker.service';
import { BlacklistUserEntity } from './user/infrastructure/persistence/blacklist-user.entity';
import { TypeOrmBlacklistUserRepository } from './user/infrastructure/persistence/typeorm-blacklist-user.repository';

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
