import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '../../../../../../shared/app/modules/shared/persistence/timestamp.entity';
import { blacklistsConfig } from '../../../config/blacklists.config';

const { entity } = blacklistsConfig.user;

@Entity(entity)
export class BlacklistUserEntity extends TimestampEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	reason: string;

	@Column({ unique: true })
	userId: string;
}
