import { Seeder } from '@jorgebodega/typeorm-seeding';
import { DataSource } from 'typeorm';
import { ApiKeyEntity } from '../../../src/app/modules/api-keys/infrastructure/persistence/api-key.entity';
import { ApiKeyAudiences } from '../../../src/app/modules/api-keys/domain/enums/api-key-audiences.enum';
import { Crypto } from '../../../src/shared/app/modules/shared/services/crypto.service';
import { generateApiKey } from 'generate-api-key'

export default class ApiKeySeed extends Seeder {
    async run(dataSource: DataSource): Promise<void> {
        if(process.env.NODE_ENV !== 'development') {
            console.log(` -> It is not the development environment, skiping the Api Key seed`);
            return;
        }

        const client = 'Microservice auth';
        const description = 'Seed generated key';
        const generatedKey = generateApiKey({ method: 'base62' }) as string;
        const key = Crypto.cipher(generatedKey)
        const audience = ApiKeyAudiences.GENERAL;

        try {
            const entityManager = await dataSource.createEntityManager();
            
            const foundApiKeys = await entityManager.find<ApiKeyEntity>(ApiKeyEntity);

            if(foundApiKeys.length) {
                const cipherApiKey = foundApiKeys[0].key;
                const decipherApiKey = Crypto.decipher(cipherApiKey);
                console.log(` -> Api Key already exists <${decipherApiKey}>`);
                return;
            }

            const apiKeyEntity = await entityManager.create<ApiKeyEntity>(ApiKeyEntity, {client, description, key, audience});
            
            console.log(` -> Api Key created <${generatedKey}>`);
            
            await entityManager.save<ApiKeyEntity>(apiKeyEntity);
        } catch (error) {
            console.log(' -> data already exists :)');
        }
    }
}
