import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Model } from 'mongoose';

import { TaskDocument, TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
    let service: TasksService;
    let modelMock: Model<TaskDocument>;

    beforeEach(async () => {
        const modelMockInstance: Partial<Model<TaskDocument>> = {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(), // It's a draft, need to review the implementation
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: getModelToken(TaskEntity.name),
                    useValue: modelMockInstance,
                },
            ],
        }).compile();

        service = module.get<TasksService>(TasksService);
        modelMock = module.get<Model<TaskDocument>>(getModelToken(TaskEntity.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(modelMock).toBeDefined();
    });

    // it('should call create method', async () => {
    //     await modelMock.create();
    //     expect(modelMock.create.bind(modelMock)).toHaveBeenCalled();
    // });
});
