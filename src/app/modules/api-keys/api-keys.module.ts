import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiKeyAuthenticator } from './application/services/api-key-authenticator.service';
import { ApiKeyFinder } from './application/services/api-key-finder.service';
import { apiKeysConfig } from './config/api-keys.config';
import { ApiKeyEntity } from './infrastructure/persistence/api-key.entity';
import { TypeOrmApiKeyRepository } from './infrastructure/persistence/typeorm-api-key.repository';

const { repositoryInterface } = apiKeysConfig.repository;

@Module({
	imports: [TypeOrmModule.forFeature([ApiKeyEntity])],
	providers: [
		ApiKeyAuthenticator,
		ApiKeyFinder,
		{ provide: repositoryInterface, useClass: TypeOrmApiKeyRepository },
	],
	exports: [ApiKeyFinder, ApiKeyAuthenticator],
})
export class ApiKeysModule {}
