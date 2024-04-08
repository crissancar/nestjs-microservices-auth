import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '../../../../shared/app/modules/shared/persistence/timestamp.entity';
import { apiKeysConfig } from '../config/api-keys.config';
import { ApiKeyAudiences } from '../enums/api-key-audiences.enum';

const { entity } = apiKeysConfig;

@Entity(entity)
export class ApiKeyEntity extends TimestampEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	client: string;

	@Column()
	description: string;

	@Column({ unique: true })
	key: string;

	@Column({
		type: 'enum',
		enum: ApiKeyAudiences,
		default: ApiKeyAudiences.GENERAL,
	})
	audience: ApiKeyAudiences;
}
