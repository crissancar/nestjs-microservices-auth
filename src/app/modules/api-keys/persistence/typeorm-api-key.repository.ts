import { FindOneOptions } from 'typeorm';

import { TypeOrmRepository } from '../../../../shared/app/modules/shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../../../shared/app/modules/shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../../shared/app/modules/shared/types/nullable.type';
import { ApiKeyRepository } from '../repositories/api-key.repository';
import { ApiKeyEntity } from './api-key.entity';

export class TypeOrmApiKeyRepository
	extends TypeOrmRepository<ApiKeyEntity>
	implements ApiKeyRepository
{
	async find(key: string): Promise<Nullable<ApiKeyEntity>> {
		const options = { where: { key } } as FindOneOptions<ApiKeyEntity>;

		return this.findOneEntity(options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<ApiKeyEntity> {
		return ApiKeyEntity;
	}
}
