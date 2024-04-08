export const authConfig = {
	globalRoute: 'auth',
	postController: {
		constants: {
			context: 'AuthPostController',
			routes: {
				login: 'login',
				refreshToken: 'refresh-token',
			},
		},
		logs: {
			login: {
				requestLog: 'Request received to create an user token',
			},
			refresh: {
				requestLog: 'Request received to refresh an user token',
			},
		},
	},
	authenticator: {
		constants: {
			context: 'Authenticator',
		},
	},
	localGuard: {
		constants: {
			context: 'LocalGuard',
		},
	},
	localStrategy: {
		constants: {
			strategyFields: {
				email: 'email',
				password: 'password',
			},
		},
	},
	jwtStrategy: {
		constants: {
			strategyName: 'jwt',
		},
	},
};
