import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';
import { WelcomeLogs } from './config/logger/welcome-logs.config';
import { LoggerFactory } from './shared/app/modules/shared/services/logger-factory.service';

const logger = LoggerFactory.create('');

const queues = [
	'auth_user_queue',
	'local_strategy_queue',
	'auth_create_tokens_queue',
	'auth_api_key_queue',
];

async function bootstrap(queue: string): Promise<void> {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.RMQ,
		options: {
			urls: ['amqps://qagxqjke:XuoOJiC3RCN2C0E_oNuEWv1KZ6y4NGem@rat.rmq2.cloudamqp.com/qagxqjke'],
			queue,
			queueOptions: { durable: false },
			// prefetchCount: 1,
			// headers: {}
		},
	});

	// Set Pino logger
	app.useLogger(app.get(Logger));

	// Launch the app
	await app.listen();

	// Welcome logs
	WelcomeLogs.run(queue);
}

queues.forEach((queue) => {
	void bootstrap(queue);
});
