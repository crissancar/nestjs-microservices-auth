export class CheckBlacklistUserRequest {
	readonly id: string;

	constructor(id: string) {
		this.id = id;
	}

	static create(id: string): CheckBlacklistUserRequest {
		return new CheckBlacklistUserRequest(id);
	}
}
