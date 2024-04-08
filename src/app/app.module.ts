import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { loggerConfig } from '../config/logger/logger.config';
import { typeOrmConfig } from '../config/orm/typeorm.config';
import { providersConfig } from './app.config';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
	imports: [LoggerModule.forRoot(loggerConfig), TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
	controllers: [AppController],
	providers: providersConfig,
})
export class AppModule {}
