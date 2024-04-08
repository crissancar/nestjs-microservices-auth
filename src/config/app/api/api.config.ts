import { documentationConfig } from './documentation.config';

export const apiConfig = {
	api: {
		url: null as string,
		port: 9977,
		version: 'v1',
		responseTime: true,
		documentation: documentationConfig,
	},
};
