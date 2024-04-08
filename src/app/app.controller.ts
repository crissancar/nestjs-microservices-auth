import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';

import { config } from '../config/app/index';

const { project } = config;

const logger = new Logger('AppController');

@Controller()
export class AppController {
	@HttpCode(HttpStatus.OK)
	@Get()
	welcome(): object {
		logger.log(`Welcome to ${project.appName}`);

		return { welcome: project.appName };
	}
}
