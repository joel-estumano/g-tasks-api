import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context);
    }

    handleRequest<User>(err: Error, user: User): User {
        // Se houver um erro ou o token for inválido, lançar exceção "Não autorizado"
        if (err || !user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user; // Retorna o usuário autenticado
    }
}
