import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ApiKeysModule } from '../api-keys/api-keys.module';
import { BlacklistsModule } from '../blacklists/blacklists.module';
import { UsersModule } from '../users/users.module';
import { jwtConfig } from './config/jwt.config';
import { AuthPostController } from './controllers/auth-post.controller';
import { JwtCreator } from './application/services/jwt-creator.service';

@Module({
	imports: [JwtModule.register(jwtConfig), ApiKeysModule, BlacklistsModule, UsersModule],
	controllers: [AuthPostController],
	providers: [JwtCreator],
})
export class AuthModule {}
