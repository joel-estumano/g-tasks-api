import mongoose, { Model, PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskCreateDto } from './dtos/task-create.dto';
import { TaskDocument, TaskEntity } from './entities/task.entity';
import { TasksQueryPaginateDto } from './dtos/tasks-query-paginate.dto';
import { TaskUpdateDto } from './dtos/task-update.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(TaskEntity.name)
        private readonly model: Model<TaskDocument>,
    ) {}

    async create(dto: TaskCreateDto): Promise<TaskDocument> {
        const taskModel = new this.model(dto);
        return await taskModel.save();
    }

    async update(id: string, dto: TaskUpdateDto): Promise<TaskDocument | null> {
        return await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    async paginate(dto: Partial<TasksQueryPaginateDto>): Promise<PaginateResult<TaskDocument>> {
        const options: PaginateOptions = {
            page: dto.page,
            limit: dto.limit,
            pagination: dto.pagination,
        };

        let query: mongoose.FilterQuery<TaskDocument> = {};

        return await (this.model as PaginateModel<TaskDocument>).paginate(query, options);
    }
}
