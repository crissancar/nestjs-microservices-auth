import { FindOneOptions } from 'typeorm';

import { TypeOrmRepository } from '../../../../../../shared/app/modules/shared/persistence/typeorm.repository';
import { GenericEntityClassOrSchema } from '../../../../../../shared/app/modules/shared/types/generic-entity-class-or-schema.type';
import { Nullable } from '../../../../../../shared/app/modules/shared/types/nullable.type';
import { BlacklistIPRepository } from '../../domain/repositories/blacklist-ip.repository';
import { BlacklistIPEntity } from './blacklist-ip.entity';

export class TypeOrmBlacklistIPRepository
	extends TypeOrmRepository<BlacklistIPEntity>
	implements BlacklistIPRepository
{
	async find(ip: string): Promise<Nullable<BlacklistIPEntity>> {
		const options = { where: { ip } } as FindOneOptions<BlacklistIPEntity>;

		return this.findOneEntity(options);
	}

	protected entitySchema(): GenericEntityClassOrSchema<BlacklistIPEntity> {
		return BlacklistIPEntity;
	}
}
