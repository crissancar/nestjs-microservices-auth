import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthDomainEvents } from '../../../../shared/app/modules/auth/enums/auth-domain-events.enum';
import { AuthenticateApiKeyPayload } from '../../../../shared/app/modules/auth/interfaces/authenticate-api-key-payload.interface';
import { AuthenticateUserPayload } from '../../../../shared/app/modules/auth/interfaces/authenticate-user-payload.interface';
import { CreateUserTokensPayload } from '../../../../shared/app/modules/auth/interfaces/create-user-tokens-payload.interface';
import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { AuthenticateApiKeyResponse } from '../../api-keys/application/dtos/authenticate-api-key.response.dto';
import { ApiKeyAuthenticator } from '../../api-keys/application/services/api-key-authenticator.service';
import { UserAuthenticator } from '../../users/application/services/user-authenticator.service';
import { AuthenticatedUser } from '../application/dtos/authenticated-user.dto';
import { CreateUserTokensResponse } from '../application/dtos/create-user-tokens-response.dto';
import { JwtCreator } from '../application/services/jwt-creator.service';
import { authConfig } from '../config/auth.config';

const { postController } = authConfig;
const { context } = postController.constants;
const { login, refresh } = postController.logs;

const logger = LoggerFactory.create(context);

@Controller()
export class AuthPostController {
	constructor(
		private readonly userAuthenticator: UserAuthenticator,
		private readonly apiKeyAuthenticator: ApiKeyAuthenticator,
		private readonly jwtCreator: JwtCreator,
	) {}

	@MessagePattern(AuthDomainEvents.AUTH_USER)
	async authenticateUser(@Payload() payload: AuthenticateUserPayload): Promise<AuthenticatedUser> {
		logger.log('Event authenticate user to local strategy');

		const request = payload.data.attributes;
		const correlation = payload.data.meta.correlation as never;

		return this.userAuthenticator.run({ ...request, correlation });
	}

	@MessagePattern(AuthDomainEvents.AUTH_API_KEY)
	async authenticateApiKey(
		@Payload() payload: AuthenticateApiKeyPayload,
	): Promise<AuthenticateApiKeyResponse> {
		logger.log('Event authenticate api key');

		const request = payload.data.attributes;

		return this.apiKeyAuthenticator.run(request);
	}

	@MessagePattern(AuthDomainEvents.CREATE_TOKENS)
	createTokens(@Payload() payload: CreateUserTokensPayload): CreateUserTokensResponse {
		logger.log('Event create tokens to authenticated user');

		const authUser = payload.data.attributes;

		return this.jwtCreator.run(authUser);
	}
}
