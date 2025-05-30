import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserEntity, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

describe('UsersService', () => {
    let service: UsersService;
    let modelMock: Model<UserDocument>;

    beforeEach(async () => {
        const modelMockInstance: Partial<Model<UserDocument>> = {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(), // It's a draft, need to review the implementation
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken(UserEntity.name),
                    useValue: modelMockInstance, // Mock do modelo Mongoose
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        modelMock = module.get<Model<UserDocument>>(getModelToken(UserEntity.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(modelMock).toBeDefined();
    });

    // it('should call create method', async () => {
    //     await modelMock.create();
    //     expect(() => modelMock.create()).toHaveBeenCalled();
    // });
});
