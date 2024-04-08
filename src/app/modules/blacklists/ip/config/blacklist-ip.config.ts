export const blacklistIPConfig = {
	entity: { name: 'blacklist_ip' },
	repository: {
		repositoryInterface: 'BlacklistIPRepository',
	},
	checker: {
		constants: {
			context: 'BlacklistIPChecker',
		},
	},
};
