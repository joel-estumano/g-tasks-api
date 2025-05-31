import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity, UserDocument } from './entities/user.entity';
import { UserProfileEntity, UserProfileDocument } from '../user-profiles/entities/user-profile.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let service: UsersService;
    let userModelMock: Model<UserDocument>;
    let userProfileModelMock: Model<UserProfileDocument>;

    beforeEach(async () => {
        const userModelMockInstance: Partial<Model<UserDocument>> = {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
        };

        const userProfileModelMockInstance: Partial<Model<UserProfileDocument>> = {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
        };

        const databaseMock = {
            connect: jest.fn(),
            startSession: jest.fn().mockReturnValue({
                startTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                abortTransaction: jest.fn(),
                endSession: jest.fn(),
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getModelToken(UserEntity.name),
                    useValue: userModelMockInstance, // Mock do modelo UserEntity
                },
                {
                    provide: getModelToken(UserProfileEntity.name),
                    useValue: userProfileModelMockInstance, // Mock do modelo UserProfileEntity
                },
                {
                    provide: 'DatabaseConnection',
                    useValue: databaseMock, // Mock da conexão do banco
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userModelMock = module.get<Model<UserDocument>>(getModelToken(UserEntity.name));
        userProfileModelMock = module.get<Model<UserProfileDocument>>(getModelToken(UserProfileEntity.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(userModelMock).toBeDefined();
        expect(userProfileModelMock).toBeDefined();
    });

    it('should create a user', () => {
        const mockUser: Partial<UserDocument> = { _id: '123', email: 'test@example.com' };
        jest.spyOn(service, 'create').mockResolvedValue(mockUser as UserDocument);

        /* const result = await service.create({ email: 'test@example.com' });
        expect(result).toEqual(mockUser); */
    });
});
