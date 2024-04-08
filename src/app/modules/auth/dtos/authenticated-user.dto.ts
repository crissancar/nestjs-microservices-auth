import { UserAudiences } from '../../../../shared/app/modules/users/enums/user-audiences.enum';
import { User } from '../../../../shared/app/modules/users/models/user.model';

export class AuthenticatedUser {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	readonly audiences: Array<UserAudiences>;

	constructor(id: string, name: string, email: string, audiences: Array<UserAudiences>) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.audiences = audiences;
	}

	static create(user: User): AuthenticatedUser {
		const { id, name, email, audiences } = user;

		return new AuthenticatedUser(id, name, email, audiences);
	}
}
