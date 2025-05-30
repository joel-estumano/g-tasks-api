import { AuthJwtPayload } from '../types/auth-jwt-payload.type';
import { ConfigType } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConfig } from '@common/configs';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(jwtConfig.KEY)
        private readonly jwtConfigKey: ConfigType<typeof jwtConfig>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfigKey.secret as string,
            ignoreExpiration: false,
        });
    }

    validate(payload: AuthJwtPayload) {
        return { _id: payload.sub, email: payload.email, name: payload.name };
    }
}
