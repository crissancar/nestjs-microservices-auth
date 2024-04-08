import { ApiKeyEntity } from '../../../app/modules/api-keys/persistence/api-key.entity';
import { AuthenticatedUser } from '../../../app/modules/auth/dtos/authenticated-user.dto';

declare global {
	namespace Express {
		interface Request {
			apiKey: ApiKeyEntity;
			authUser: AuthenticatedUser;
		}
	}
}

export {};
