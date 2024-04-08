export const apiKeysConfig = {
	entity: { name: 'api_key' },
	repository: {
		repositoryInterface: 'ApiKeyRepository',
	},
	finder: {
		constants: {
			context: 'ApiKeyFinder',
		},
	},
};
