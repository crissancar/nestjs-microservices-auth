import { Nullable } from '../../../../../../shared/app/modules/shared/types/nullable.type';
import { BlacklistUserEntity } from '../../infrastructure/persistence/blacklist-user.entity';

export interface BlacklistUserRepository {
	find(userId: string): Promise<Nullable<BlacklistUserEntity>>;
}
