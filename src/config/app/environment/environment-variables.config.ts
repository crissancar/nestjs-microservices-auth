import { BinaryLike, CipherCCMTypes, CipherKey, Encoding } from 'crypto';

export const environmentVariablesConfig = {
	axios: {
		externalApi: {
			baseURL: null as string,
			apiKey: null as string,
		},
	},
	bcrypt: {
		salt: null as number,
		pepper: null as string,
	},
	client: {
		signature: {
			enabled: null as boolean,
			publicKey: null as string,
		},
	},
	crypto: {
		algorithm: null as CipherCCMTypes,
		iv: null as BinaryLike,
		key: null as CipherKey,
		cipher: {
			input: {
				encoding: null as Encoding,
			},
			output: {
				encoding: null as Encoding,
			},
		},
		decipher: {
			input: {
				encoding: null as Encoding,
			},
			output: {
				encoding: null as Encoding,
			},
		},
	},
	env: {
		show: null as boolean,
	},
	jwt: {
		secret: null as string,
		access: {
			expiresIn: null as number,
		},
		refresh: {
			expiresIn: null as number,
		},
	},
	logger: {
		level: null as string,
		loki: null as boolean,
	},
	postgres: {
		database: {
			name: null as string,
			host: null as string,
			password: null as string,
			port: null as number,
			username: null as string,
		},
	},
	typeorm: {
		logging: null as boolean,
	},
};
