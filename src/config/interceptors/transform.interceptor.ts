import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		return next.handle().pipe(
			filter((data) => !!data),
			map((data) => {
				const response = context.switchToHttp().getRequest();
				// if (response.query.export) {}

				if (data.data && Array.isArray(data.data)) {
					if (!response.res) {
						return data;
					}
					if (!response.res.headers) {
						response.res.headers = {};
					}
					// Set headers
					response.res.set({ count: data.count });
					response.res.set({ limit: data.take });
					response.res.set({ page: data.page });
					// eslint-disable-next-line no-param-reassign
					data = data.data;
				}

				return data;
			}),
		);
	}
}
