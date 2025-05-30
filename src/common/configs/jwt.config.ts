import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

const jwtConfig = registerAs(
    'jwtConfig',
    (): JwtSignOptions => ({
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION_TIME,
    }),
);

const jwtRefreshConfig = registerAs(
    'jwtRefreshConfig',
    (): JwtSignOptions => ({
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
    }),
);

export { jwtConfig, jwtRefreshConfig };
