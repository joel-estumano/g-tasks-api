import { AuthJwtPayload } from '../types/auth-jwt-payload.type';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { jwtRefreshConfig } from '@common/configs';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        @Inject(jwtRefreshConfig.KEY)
        private readonly jwtRefresh: ConfigType<typeof jwtRefreshConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            secretOrKey: jwtRefresh.secret as string,
            ignoreExpiration: false,
        });
    }

    validate(payload: AuthJwtPayload) {
        return { _id: payload.sub, email: payload.email, name: payload.name };
    }
}
