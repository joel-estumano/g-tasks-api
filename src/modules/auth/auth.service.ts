import { Inject, Injectable } from '@nestjs/common';
import { UserDocument } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtRefreshConfig } from '@common/configs';
import { AuthJwtPayload, AuthJwtResponse } from './types/auth-jwt-payload.type';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        @Inject(jwtRefreshConfig.KEY)
        private readonly jwtRefreshKey: ConfigType<typeof jwtRefreshConfig>,
    ) {}

    async validateUser(email: string, pass: string): Promise<UserDocument | null> {
        const user = await this.usersService.findOne('email', email, ['_id', 'name', 'email', 'password']);
        if (user && this.usersService.validatePassword(user.password, pass)) {
            return user;
        }
        return null;
    }

    login(user: UserDocument): AuthJwtResponse {
        const payload: AuthJwtPayload = {
            sub: user._id as string,
            email: user.email,
            name: user.name,
        };

        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, this.jwtRefreshKey),
        };
    }

    refresh(dto: Pick<AuthJwtResponse, 'refresh_token'>) {
        const decoded: AuthJwtPayload = this.jwtService.verify(dto.refresh_token, {
            secret: this.jwtRefreshKey.secret,
        });
        const user = {
            _id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
        } as UserDocument;

        return this.login(user);
    }
}
