/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
import { Request } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { Params } from 'nestjs-pino';
import * as pino from 'pino';

import { config } from '../app/index';

const { logger, environment } = config;

export const loggerConfig: Params = {
	pinoHttp: {
		level: logger.level ? logger.level : 'info',
		formatters: formattersConfig(),
		transport: transportConfig(),
		messageKey: 'message',
		autoLogging: environment !== 'test',
		customReceivedMessage: (req: IncomingMessage, res: ServerResponse) => {
			const correlationId = res.getHeader('x-correlation-id') as string;

			return `Request with id <${correlationId}> started`;
		},
		customReceivedObject: (req: IncomingMessage & Request) => {
			const { headers, body } = req;

			if (Object.entries(body as object).length === 0) {
				return { request: { headers } };
			}

			return { request: { headers, body } };
		},
		customSuccessMessage: (req: IncomingMessage, res: ServerResponse) => {
			const correlationId = res.getHeader('x-correlation-id') as string;

			return `Request with id <${correlationId}> completed`;
		},
		customSuccessObject: (req: IncomingMessage, res: ServerResponse, val: any) => {
			const { statusCode, statusMessage } = res;
			const { method } = req;
			const responseTime = `${val.responseTime}ms`;

			if (statusCode >= 400) {
				return {
					method,
					responseTime,
					exception: statusCode,
					status: { code: statusCode, message: statusMessage },
				};
			}

			return { method, responseTime, status: { code: statusCode, message: statusMessage } };
		},
		customErrorMessage: (req: IncomingMessage, res: ServerResponse) => {
			const correlationId = res.getHeader('x-correlation-id') as string;

			return `Request with id <${correlationId}> failed`;
		},
		customErrorObject: (req: IncomingMessage, res: ServerResponse, val: any) => {
			const { statusCode, statusMessage } = res;
			const { method } = req;
			const responseTime = `${val.responseTime}ms`;

			return {
				method,
				responseTime,
				exception: statusCode,
				status: { code: statusCode, message: statusMessage },
			};
		},
		serializers: {
			req: (): undefined => {
				return undefined;
			},
			res: (): undefined => {
				return undefined;
			},
		},
		customProps: (req: IncomingMessage): object => {
			return {
				endpoint: `${req.method} ${req.url}`,
			};
		},
	},
};

function transportConfig(): pino.TransportSingleOptions {
	return logger.loki
		? {
				target: 'pino/file',
				options: {
					destination: 'artifacts/logs/app.log',
					mkdir: true,
				},
			}
		: {
				target: 'pino-pretty',
				options: {
					messageKey: 'message',
					ignore: 'pid,hostname,time',
					colorize: true,
				},
			};
}

function formattersConfig(): object {
	return {
		level: (label) => ({ level: label.toUpperCase() }),
		bindings: (bindings: pino.Bindings): pino.Bindings => {
			const { pid, hostname, ...modelBindings } = bindings;

			return modelBindings;
		},
	};
}
