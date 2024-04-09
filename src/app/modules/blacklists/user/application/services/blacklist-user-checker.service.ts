import { Inject, Injectable } from '@nestjs/common';

import { blacklistsConfig } from '../../../config/blacklists.config';
import { BlockedUserException } from '../../domain/exceptions/blocked-user.exception';
import { BlacklistUserRepository } from '../../domain/repositories/blacklist-user.repository';
import { CheckBlacklistUserRequest } from '../dtos/check-blacklist-user-request.dto';

const { checker, repository } = blacklistsConfig.user;
const { repositoryInterface } = repository;
const { context } = checker.constants;

@Injectable()
export class BlacklistUserChecker {
	constructor(@Inject(repositoryInterface) private readonly repository: BlacklistUserRepository) {}

	async run(request: CheckBlacklistUserRequest): Promise<void> {
		const foundBlacklistUser = await this.repository.find(request.id);

		if (foundBlacklistUser) {
			throw new BlockedUserException(context);
		}
	}
}
