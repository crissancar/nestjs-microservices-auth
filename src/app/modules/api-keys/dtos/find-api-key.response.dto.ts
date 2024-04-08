import { ApiKeyAudiences } from '../enums/api-key-audiences.enum';

export class FindApiKeyResponse {
	readonly key: string;

	readonly audience: ApiKeyAudiences;

	constructor(key: string, audience: ApiKeyAudiences) {
		this.key = key;
		this.audience = audience;
	}

	static create(key: string, audience: ApiKeyAudiences): FindApiKeyResponse {
		return new FindApiKeyResponse(key, audience);
	}
}
