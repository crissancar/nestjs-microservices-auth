import { JwtModuleOptions } from '@nestjs/jwt';

import { config } from '../../../../config/app/index';

const { jwt } = config;

export const jwtConfig: JwtModuleOptions = { secret: jwt.secret };
