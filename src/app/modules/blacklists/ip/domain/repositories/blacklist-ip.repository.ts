import { Nullable } from '../../../../../../shared/app/modules/shared/types/nullable.type';
import { BlacklistIPEntity } from '../../infrastructure/persistence/blacklist-ip.entity';

export interface BlacklistIPRepository {
	find(ip: string): Promise<Nullable<BlacklistIPEntity>>;
}
