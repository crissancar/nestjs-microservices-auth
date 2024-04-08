import { AuthenticateApiKeyRequestInterface } from '../../../../shared/app/modules/auth/interfaces/authenticate-api-key-request.interface';
import { Exact } from '../../../../shared/app/modules/shared/types/exact.type';

export class AuthenticateApiKeyRequest
	implements Exact<AuthenticateApiKeyRequestInterface, AuthenticateApiKeyRequest>
{
	readonly key: string;
}
