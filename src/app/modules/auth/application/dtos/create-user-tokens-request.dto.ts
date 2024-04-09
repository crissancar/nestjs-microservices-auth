import { AuthenticatedUser } from '../../../../../shared/app/modules/auth/dtos/authenticated-user.dto';
import { CreateUserTokensRequestInterface } from '../../../../../shared/app/modules/auth/interfaces/create-user-tokens-request.interface';
import { Exact } from '../../../../../shared/app/modules/shared/types/exact.type';

export class CreateUserTokensRequest
	implements Exact<CreateUserTokensRequestInterface, CreateUserTokensRequest>
{
	correlation: never;

	authUser: AuthenticatedUser;
}
