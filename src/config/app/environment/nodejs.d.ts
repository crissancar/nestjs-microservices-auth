type Environments = 'development' | 'test' | 'staging' | 'production';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: Environments;
		}
	}
}

export {};
