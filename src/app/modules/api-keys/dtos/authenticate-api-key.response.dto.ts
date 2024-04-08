import { ApiKeyAudiences } from '../enums/api-key-audiences.enum';

export class AuthenticateApiKeyResponse {
	readonly key: string;

	readonly audience: ApiKeyAudiences;

	constructor(key: string, audience: ApiKeyAudiences) {
		this.key = key;
		this.audience = audience;
	}

	static create(key: string, audience: ApiKeyAudiences): AuthenticateApiKeyResponse {
		return new AuthenticateApiKeyResponse(key, audience);
	}
}
