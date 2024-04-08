import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { apiKeysConfig } from './config/api-keys.config';
import { ApiKeyEntity } from './persistence/api-key.entity';
import { TypeOrmApiKeyRepository } from './persistence/typeorm-api-key.repository';
import { ApiKeyAuthenticator } from './services/api-key-authenticator.service';
import { ApiKeyFinder } from './services/api-key-finder.service';

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
