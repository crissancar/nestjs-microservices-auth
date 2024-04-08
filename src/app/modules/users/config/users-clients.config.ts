import { ClientProviderOptions } from '@nestjs/microservices';

import { ClientConfigFactory } from '../../../../shared/app/modules/shared/services/client-config-factory.service';
import { UserProxies } from '../../../../shared/app/modules/users/enums/user-proxies.enum';
import { UserQueues } from '../../../../shared/app/modules/users/enums/user-queues.enum';

export const usersClientsConfig: Array<ClientProviderOptions> = [
	ClientConfigFactory.create(UserProxies.FIND_RAW_BY_OPTIONS, UserQueues.FIND_RAW_BY_OPTIONS),
];
