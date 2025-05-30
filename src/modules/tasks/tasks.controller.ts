import { Body, Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TaskCreateDto } from './dtos/task-create.dto';
import { TaskDocument } from './entities/task.entity';
import { TaskOutputDto } from './dtos/task-output.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly service: TasksService) {}

    @Post()
    @ApiOperation({ summary: 'create a new task' })
    @ApiResponse({
        status: 201,
        description: 'task created successfully',
        type: TaskOutputDto,
    })
    @ApiResponse({ status: 400, description: 'bad request' })
    async create(@Body() dto: TaskCreateDto): Promise<TaskDocument> {
        return await this.service.create(dto);
    }
}
