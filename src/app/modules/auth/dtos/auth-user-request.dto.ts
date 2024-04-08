import { LoginUserRequestInterface } from '../../../../shared/app/modules/auth/interfaces/login-user-request.interface';
import { Exact } from '../../../../shared/app/modules/shared/types/exact.type';

export class AuthUserRequest implements Exact<LoginUserRequestInterface, AuthUserRequest> {
	readonly correlation: never;

	readonly email: string;

	readonly password: string;
}
