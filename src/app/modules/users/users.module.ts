import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { BlacklistsModule } from '../blacklists/blacklists.module';
import { usersClientsConfig } from './config/users-clients.config';
import { UserAuthenticator } from './services/user-authenticator.service';

@Module({
	imports: [BlacklistsModule, ClientsModule.register(usersClientsConfig)],
	providers: [UserAuthenticator],
	exports: [UserAuthenticator],
})
export class UsersModule {}
