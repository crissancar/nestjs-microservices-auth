import { Injectable } from '@nestjs/common';

import { Crypto } from '../../../../../shared/app/modules/shared/services/crypto.service';
import { AuthenticateApiKeyRequest } from '../dtos/authenticate-api-key.request.dto';
import { AuthenticateApiKeyResponse } from '../dtos/authenticate-api-key.response.dto';
import { FindApiKeyRequest } from '../dtos/find-api-key.request.dto';
import { FindApiKeyResponse } from '../dtos/find-api-key.response.dto';
import { ApiKeyFinder } from './api-key-finder.service';

@Injectable()
export class ApiKeyAuthenticator {
	constructor(private readonly finder: ApiKeyFinder) {}

	async run(request: AuthenticateApiKeyRequest): Promise<AuthenticateApiKeyResponse> {
		const authenticatedApiKey = await this.getAuthenticatedApiKey(request.key);

		return AuthenticateApiKeyResponse.create(authenticatedApiKey.key, authenticatedApiKey.audience);
	}

	private async getAuthenticatedApiKey(key: string): Promise<FindApiKeyResponse> {
		const cipherKey = Crypto.cipher(key);

		const request = FindApiKeyRequest.create(cipherKey);

		return this.finder.run(request);
	}
}
