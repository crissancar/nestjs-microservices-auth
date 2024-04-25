/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { ApiKeyAudiences } from '../../../src/app/modules/api-keys/domain/enums/api-key-audiences.enum';
import { ApiKeyEntity } from '../../../src/app/modules/api-keys/infrastructure/persistence/api-key.entity';
import { Crypto } from '../../../src/shared/app/modules/shared/services/crypto.service';

export default class ApiKeySeed implements Seeder {
	async run(dataSource: DataSource): Promise<void> {
		const client = 'General';
		const description = 'Seed generated key';
		const generatedKey = '5cf6Q0kHQBcQHgQJouZr8z';
		const key = Crypto.cipher(generatedKey);
		const audience = ApiKeyAudiences.GENERAL;

		try {
			const entityManager = dataSource.createEntityManager();

			const foundApiKeys = await entityManager.find<ApiKeyEntity>(ApiKeyEntity);

			if (foundApiKeys.length) {
				const cipherApiKey = foundApiKeys[0].key;
				const decipherApiKey = Crypto.decipher(cipherApiKey);
				console.log(` -> Api Key already exists <${decipherApiKey}>`);

				return;
			}

			const apiKeyEntity = entityManager.create(ApiKeyEntity, {
				client,
				description,
				key,
				audience,
			});

			await entityManager.save<ApiKeyEntity>(apiKeyEntity);
		} catch (error) {
			console.log(error);
		}
	}
}
