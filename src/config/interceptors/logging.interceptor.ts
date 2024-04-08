import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { LoggerFactory } from '../../shared/app/modules/shared/services/logger-factory.service';
import { Uuid } from '../../shared/app/modules/shared/services/uuid.service';

const logger = LoggerFactory.create('LoggingInterceptor');

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const rpcContext = context.switchToRpc();
		// TODO añadir event, queue etc en el payload
		const message = rpcContext.getData();
		const idempotency = Uuid.random();
		logger.log({ data: message.data, idempotency }, `Message received`);
		const now = Date.now();

		return next.handle().pipe(
			tap(() => logger.log({ idempotency }, `Message handled succesfully (${Date.now() - now}ms)`)),
			catchError((error) => {
				logger.log({ idempotency }, `Error handling message`);
				throw error;
			}),
		);
	}
}
