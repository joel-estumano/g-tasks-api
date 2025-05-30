import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';
import { TaskCreateDto } from './dtos/task-create.dto';
import { TaskDocument, TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(TaskEntity.name)
        private readonly model: Model<TaskDocument>,
    ) {}

    async create(dto: TaskCreateDto): Promise<TaskDocument> {
        const newTicket = new this.model(dto);
        return await newTicket.save();
    }
}
