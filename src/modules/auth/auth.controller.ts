import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request, Body } from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { AuthJwtResponse } from './types/auth-jwt-payload.type';
import { AuthService } from './auth.service';
import { UserDocument } from '../users/entities/user.entity';
import { LocalAuthGuard } from './guards/local/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Request() req: { user: UserDocument }): AuthJwtResponse {
        return this.authService.login(req.user);
    }

    @Public()
    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refresh(@Body() dto: Pick<AuthJwtResponse, 'refresh_token'>): AuthJwtResponse {
        return this.authService.refresh(dto);
    }
}
