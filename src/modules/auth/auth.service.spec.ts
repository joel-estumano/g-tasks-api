import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { jwtRefreshConfig } from '@common/configs';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
    let service: AuthService;
    let userService: UsersService;
    let jwtService: JwtService; // It's a draft, need to review the implementation

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: {
                        /* mock do serviço de usuários */
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        /* mock do serviço JWT */
                    },
                },
                {
                    provide: jwtRefreshConfig.KEY,
                    useValue: { secret: 'mock-secret-refresh' }, // Mock do valor da configuração
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
        expect(jwtService).toBeDefined();
    });
});
