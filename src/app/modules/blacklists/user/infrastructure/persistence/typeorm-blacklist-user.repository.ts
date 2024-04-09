import { FindOneOptions } from 'typeorm';

import { TypeOrmRepository } from '../../../../../../shared/app/modules/shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../../../../../shared/app/modules/shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../../../../shared/app/modules/shared/types/nullable.type';
import { BlacklistUserRepository } from '../../domain/repositories/blacklist-user.repository';
import { BlacklistUserEntity } from './blacklist-user.entity';

export class TypeOrmBlacklistUserRepository
	extends TypeOrmRepository<BlacklistUserEntity>
	implements BlacklistUserRepository
{
	async find(userId: string): Promise<Nullable<BlacklistUserEntity>> {
		const options = { where: { userId } } as FindOneOptions<BlacklistUserEntity>;

		return this.findOneEntity(options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<BlacklistUserEntity> {
		return BlacklistUserEntity;
	}
}
