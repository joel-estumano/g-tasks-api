import { Test, TestingModule } from '@nestjs/testing';

import { Model } from 'mongoose';

import { UserProfilesService } from './user-profiles.service';
import { UserProfileDocument, UserProfileEntity } from './entities/user-profile.entity';
import { getModelToken } from '@nestjs/mongoose';

describe('UserProfilesService', () => {
    let service: UserProfilesService;
    let modelMock: Model<UserProfileDocument>;

    beforeEach(async () => {
        const modelMockInstance: Partial<Model<UserProfileDocument>> = {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(), // It's a draft, need to review the implementation
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserProfilesService,
                {
                    provide: getModelToken(UserProfileEntity.name),
                    useValue: modelMockInstance, // Mock do modelo Mongoose
                },
            ],
        }).compile();

        service = module.get<UserProfilesService>(UserProfilesService);
        modelMock = module.get<Model<UserProfileDocument>>(getModelToken(UserProfileEntity.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(modelMock).toBeDefined();
    });
});
