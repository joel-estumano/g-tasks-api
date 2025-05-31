import { Test, TestingModule } from '@nestjs/testing';

import { UserProfilesController } from './user-profiles.controller';
import { UserProfilesService } from './user-profiles.service';

describe('UserProfilesController', () => {
    let controller: UserProfilesController;
    let service: UserProfilesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserProfilesController],
            providers: [
                {
                    provide: UserProfilesService,
                    useValue: {
                        // Mockando métodos do serviço
                    },
                },
            ],
        }).compile();

        controller = module.get<UserProfilesController>(UserProfilesController);
        service = module.get<UserProfilesService>(UserProfilesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
