export class FindApiKeyRequest {
	readonly key: string;

	constructor(key: string) {
		this.key = key;
	}

	static create(apiKey: string): FindApiKeyRequest {
		return new FindApiKeyRequest(apiKey);
	}
}
