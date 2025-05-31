import { Test, TestingModule } from '@nestjs/testing';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
    let controller: TasksController;
    let service: TasksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: TasksService,
                    useValue: {
                        create: jest.fn(), // Mockando métodos do serviço
                    },
                },
            ],
        }).compile();

        controller = module.get<TasksController>(TasksController);
        service = module.get<TasksService>(TasksService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});
