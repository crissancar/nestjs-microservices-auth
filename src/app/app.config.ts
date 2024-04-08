import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { ExceptionsFilter } from '../config/filters/exceptions.filter';
import { LoggingInterceptor } from '../config/interceptors/logging.interceptor';
import { TransformInterceptor } from '../config/interceptors/transform.interceptor';

export const providersConfig: Array<Provider> = [
	{
		provide: APP_INTERCEPTOR,
		useFactory: () => new TransformInterceptor(),
	},
	{
		provide: APP_INTERCEPTOR,
		useClass: LoggingInterceptor,
	},
	{
		provide: APP_FILTER,
		useFactory: () => new ExceptionsFilter(),
	},
];
