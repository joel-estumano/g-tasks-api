import { ApiAuth } from '@common/decorators/api-bearer.decorator';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { TaskCreateDto } from './dtos/task-create.dto';
import { TaskDocument } from './entities/task.entity';
import { TaskOutputDto } from './dtos/task-output.dto';
import { TaskUpdateDto } from './dtos/task-update.dto';
import { TasksQueryPaginateDto } from './dtos/tasks-query-paginate.dto';
import { TasksOutputPaginateDto } from './dtos/tasks-output-paginate.dto';

@Controller('tasks')
@ApiAuth()
export class TasksController {
    constructor(private readonly service: TasksService) {}

    @Post()
    @ApiOperation({
        summary: 'Create a new task',
        description: 'Creates a new task with the provided details.',
    })
    @ApiCreatedResponse({
        description: 'Task created successfully.',
        type: TaskOutputDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    async create(@Body() dto: TaskCreateDto): Promise<TaskDocument> {
        return await this.service.create(dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update an existing task',
        description: 'Updates the details of a task specified by its ID.',
    })
    @ApiOkResponse({
        description: 'Task updated successfully.',
        type: TaskOutputDto,
    })
    @ApiNotFoundResponse({
        description: 'Task not found. Please check the provided ID.',
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Please verify the provided information.',
    })
    async update(@Param('id') id: string, @Body() dto: TaskUpdateDto): Promise<TaskDocument | null> {
        return await this.service.update(id, dto);
    }

    @Get('paginate')
    @ApiOperation({
        summary: 'Retrieve paginated list of tasks',
        description: 'Fetches a paginated list of tasks based on the provided query parameters.',
    })
    @ApiOkResponse({
        description: 'Successful retrieval of paginated tasks.',
        type: TasksOutputPaginateDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid query parameters. Please verify the input.',
    })
    async paginate(@Query() dto: TasksQueryPaginateDto): Promise<PaginateResult<TaskDocument>> {
        return await this.service.paginate(dto);
    }
}
