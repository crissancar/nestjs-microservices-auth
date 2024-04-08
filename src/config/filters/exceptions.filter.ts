import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RpcExceptionData } from '../../shared/app/modules/shared/interfaces/rpc-exception-data.interface';
import { LoggerFactory } from '../../shared/app/modules/shared/services/logger-factory.service';

const logger = LoggerFactory.create('ExceptionsFilter');

enum ExceptionMessages {
	INTERNAL_SERVER_ERROR = 'Internal server error',
}

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown): void {
		if (!(exception instanceof RpcException)) {
			this.modelInternalServerError(exception);

			return;
		}

		this.modelRpcException(exception);
	}

	private modelInternalServerError(exception: unknown): void {
		const status = HttpStatus.INTERNAL_SERVER_ERROR;
		const message = ExceptionMessages.INTERNAL_SERVER_ERROR;
		const loggerMessage = `${status}, ${ExceptionMessages.INTERNAL_SERVER_ERROR}`;

		logger.error(exception);
		logger.error(loggerMessage);

		throw new RpcException({ status, message });
	}

	private modelRpcException(exception: RpcException): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const error = exception.getError() as RpcExceptionData;
		const { code: status, message, context } = error;

		const loggerMessage = `${status}, ${message}`;

		if (context) {
			const httpExceptionLogger = LoggerFactory.create(context);
			httpExceptionLogger.error(loggerMessage);
		} else {
			logger.error(loggerMessage);
		}

		throw exception;
	}
}
