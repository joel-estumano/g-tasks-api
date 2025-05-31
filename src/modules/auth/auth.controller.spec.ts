import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;
    let userService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login: jest.fn(), // Mockando métodos do serviço
                    },
                },
                {
                    provide: UsersService,
                    useValue: {
                        create: jest.fn(), // Mockando métodos do serviço
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
        userService = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
        expect(userService).toBeDefined();
    });
});
