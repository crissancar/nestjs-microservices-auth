import { DataSource, DataSourceOptions } from 'typeorm';

import { config } from '../app';

const { postgres, typeorm } = config;

const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	database: postgres.database.name,
	host: postgres.database.host,
	port: postgres.database.port,
	username: postgres.database.username,
	password: postgres.database.password,
	entities: ['src/**/!(*example*).entity.ts'],
	extra: {
		charset: 'utf8mb4_unicode_ci',
	},
	logging: typeorm.logging,
	migrations: ['artifacts/orm/migrations/*.ts'],
	synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
