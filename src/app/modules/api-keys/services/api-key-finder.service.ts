import { Inject, Injectable } from '@nestjs/common';

import { LoggerFactory } from '../../../../shared/app/modules/shared/services/logger-factory.service';
import { apiKeysConfig } from '../config/api-keys.config';
import { FindApiKeyRequest } from '../dtos/find-api-key.request.dto';
import { FindApiKeyResponse } from '../dtos/find-api-key.response.dto';
import { ApiKeyNotExistsException } from '../exceptions/api-key-not-exists.exception';
import { ApiKeyRepository } from '../repositories/api-key.repository';

const { finder, repository } = apiKeysConfig;
const { repositoryInterface } = repository;
const { context } = finder.constants;

const logger = LoggerFactory.create(context);

@Injectable()
export class ApiKeyFinder {
	constructor(@Inject(repositoryInterface) private readonly repository: ApiKeyRepository) {}

	async run(request: FindApiKeyRequest): Promise<FindApiKeyResponse> {
		const apiKey = await this.repository.find(request.key);

		if (!apiKey) {
			const exception = new ApiKeyNotExistsException(context);
			logger.error(exception.message);
			throw exception;
		}

		return FindApiKeyResponse.create(apiKey.key, apiKey.audience);
	}
}
