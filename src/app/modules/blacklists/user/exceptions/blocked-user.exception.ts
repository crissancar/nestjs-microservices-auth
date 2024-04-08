import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { RpcExceptionData } from '../../../../../shared/app/modules/shared/interfaces/rpc-exception-data.interface';

export class BlockedUserException extends RpcException {
	constructor(context: string) {
		const message = 'User is blocked';
		const code = HttpStatus.UNAUTHORIZED;
		const exceptionData = { code, message, context } as RpcExceptionData;

		super(exceptionData);
	}
}
