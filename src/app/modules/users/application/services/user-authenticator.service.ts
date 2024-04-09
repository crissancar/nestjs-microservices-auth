import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

import { Bcrypt } from '../../../../../shared/app/modules/shared/services/bcrypt.service';
import { EventPayloadFactory } from '../../../../../shared/app/modules/shared/services/event-payload-factory.service';
import { LoggerFactory } from '../../../../../shared/app/modules/shared/services/logger-factory.service';
import { FindByOptions } from '../../../../../shared/app/modules/shared/types/find-by-options.type';
import { FindRawUserByOptionsRequest } from '../../../../../shared/app/modules/users/dtos/find-raw-user-by-options-request.dto';
import { UserDomainEvents } from '../../../../../shared/app/modules/users/enums/user-domain-events.enum';
import { UserProxies } from '../../../../../shared/app/modules/users/enums/user-proxies.enum';
import { User } from '../../../../../shared/app/modules/users/models/user.model';
import { AuthUserRequest } from '../../../auth/application/dtos/auth-user-request.dto';
import { AuthenticatedUser } from '../../../auth/application/dtos/authenticated-user.dto';
import { authConfig } from '../../../auth/config/auth.config';
import { InvalidCredentialsException } from '../../../auth/domain/exceptions/invalid-credentials.exception';
import { CheckBlacklistUserRequest } from '../../../blacklists/user/application/dtos/check-blacklist-user-request.dto';
import { BlacklistUserChecker } from '../../../blacklists/user/application/services/blacklist-user-checker.service';

const { authenticator } = authConfig;
const { context } = authenticator.constants;

const logger = LoggerFactory.create('UserAuthenticator');

@Injectable()
export class UserAuthenticator {
	constructor(
		@Inject(UserProxies.FIND_RAW_BY_OPTIONS) private readonly proxy: ClientProxy,
		private readonly blacklistUserChecker: BlacklistUserChecker,
	) {}

	async run(request: AuthUserRequest): Promise<AuthenticatedUser> {
		const user = await this.getUser(request.email, request.correlation);

		await this.checkUserBlocked(user);

		this.checkUserAuthentication(request, user);

		return AuthenticatedUser.create(user);
	}

	private async getUser(email: string, correlation: string): Promise<User> {
		const options = {
			key: 'email',
			value: email,
			columns: ['audiences', 'password'],
		} as FindByOptions<User>;
		const request = FindRawUserByOptionsRequest.create(options, correlation);
		const payalod = EventPayloadFactory.create(UserDomainEvents.FIND_RAW_BY_OPTIONS, request);

		try {
			const foundUser$ = this.proxy
				.send<User>(UserDomainEvents.FIND_RAW_BY_OPTIONS, payalod)
				.pipe(timeout(10000));

			return await firstValueFrom(foundUser$);
		} catch (error) {
			logger.error(error);
			throw new BadRequestException();
		}
	}

	private async checkUserBlocked(user: User): Promise<void> {
		const request = CheckBlacklistUserRequest.create(user.id);

		await this.blacklistUserChecker.run(request);
	}

	private checkUserAuthentication(request: AuthUserRequest, user: User): void {
		const { password: requestPassword } = request;
		const { password: userPassword } = user;

		if (!Bcrypt.compare(requestPassword, userPassword)) {
			throw new InvalidCredentialsException(context);
		}
	}
}
