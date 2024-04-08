import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from '../app';

const { postgres, typeorm } = config;

export const typeOrmConfig: TypeOrmModuleOptions = {
	database: postgres.database.name,
	host: postgres.database.host,
	port: postgres.database.port,
	username: postgres.database.username,
	password: postgres.database.password,
	autoLoadEntities: true,
	extra: {
		charset: 'utf8mb4_unicode_ci',
	},
	logging: typeorm.logging,
	synchronize: false,
	type: 'postgres',
};
