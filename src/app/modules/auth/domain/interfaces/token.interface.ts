import { UserAudiences } from '../../../../../shared/app/modules/users/enums/user-audiences.enum';

export interface Token {
	accessToken: string;
	refreshToken: string;
}

export interface Payload {
	sub: string;
	aud: Array<UserAudiences>;
}
