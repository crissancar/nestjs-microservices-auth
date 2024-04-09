import { Inject, Injectable } from '@nestjs/common';

import { blacklistsConfig } from '../../../config/blacklists.config';
import { BlockedIpException } from '../../domain/exceptions/blocked-ip.exception';
import { BlacklistIPRepository } from '../../domain/repositories/blacklist-ip.repository';

const { checker, repository } = blacklistsConfig.ip;
const { repositoryInterface } = repository;
const { context } = checker.constants;

@Injectable()
export class BlacklistIPChecker {
	constructor(@Inject(repositoryInterface) private readonly repository: BlacklistIPRepository) {}

	async run(ip: string): Promise<void> {
		const foundIP = await this.repository.find(ip);

		if (foundIP) {
			throw new BlockedIpException(context);
		}
	}
}
