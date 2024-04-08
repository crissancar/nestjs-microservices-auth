import { apiConfig } from './api/api.config';
import { cdnConfig } from './cdn/cdn.config';
import { ConfigFactory } from './config-factory.service';
import { environmentVariablesConfig } from './environment/environment-variables.config';
import { projectConfig } from './project/project.config';

type AppConfig = typeof environmentVariablesConfig &
	typeof apiConfig &
	typeof projectConfig &
	typeof cdnConfig;

export const configClass = new ConfigFactory<AppConfig>({
	...environmentVariablesConfig,
	...apiConfig,
	...projectConfig,
	...cdnConfig,
});

export const config = configClass.get();
