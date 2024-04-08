import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampEntity } from '../../../../../shared/app/modules/shared/persistence/timestamp.entity';
import { blacklistsConfig } from '../../config/blacklists.config';

const { entity } = blacklistsConfig.ip;

@Entity(entity)
export class BlacklistIPEntity extends TimestampEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	ip: string;

	constructor(id: string, ip: string) {
		super();
		this.id = id;
		this.ip = ip;
	}

	static create(id: string, ip: string): BlacklistIPEntity {
		return new BlacklistIPEntity(id, ip);
	}
}
