export const blacklistUserConfig = {
	entity: { name: 'blacklist_user' },
	repository: {
		repositoryInterface: 'BlacklistUserRepository',
	},
	checker: {
		constants: {
			context: 'BlacklistUserChecker',
		},
	},
};
