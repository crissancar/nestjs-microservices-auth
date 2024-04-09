import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RpcExceptionData } from '../../../../../shared/app/modules/shared/interfaces/rpc-exception-data.interface';

export class ApiKeyNotExistsException extends RpcException {
	constructor(context: string) {
		const message = 'Api key not exists';
		const code = HttpStatus.NOT_FOUND;
		const exceptionData = { code, message, context } as RpcExceptionData;

		super(exceptionData);
	}
}
