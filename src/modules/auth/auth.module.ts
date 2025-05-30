import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@common/configs';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [],
            inject: [jwtConfig.KEY],
            useFactory: (jwtConfigKey: ConfigType<typeof jwtConfig>) => ({
                secret: jwtConfigKey.secret,
                signOptions: { expiresIn: jwtConfigKey.expiresIn },
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
