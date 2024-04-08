import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { config } from '../../../../config/app/index';
import { AuthenticatedUser } from '../dtos/authenticated-user.dto';
import { CreateUserTokensRequest } from '../dtos/create-user-tokens-request.dto';
import { CreateUserTokensResponse } from '../dtos/create-user-tokens-response.dto';
import { Payload } from '../interfaces/token.interface';

const { jwt } = config;

@Injectable()
export class JwtCreator {
	constructor(private readonly jwt: JwtService) {}

	run(request: CreateUserTokensRequest): CreateUserTokensResponse {
		const { authUser } = request;

		const accessToken = this.createJwt(authUser, jwt.access.expiresIn);

		const refreshToken = this.createJwt(authUser, jwt.refresh.expiresIn);

		return CreateUserTokensResponse.create(accessToken, refreshToken);
	}

	private createJwt(authUser: AuthenticatedUser, expiresIn: number): string {
		const payload = this.createPayload(authUser);
		const options = { expiresIn } as JwtSignOptions;

		return this.jwt.sign(payload, options);
	}

	private createPayload(authUser: AuthenticatedUser): Payload {
		const { id: sub, audiences: aud } = authUser;

		return { sub, aud };
	}
}
