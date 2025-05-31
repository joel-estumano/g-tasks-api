import { BaseOutputDto } from '@common/dtos/base-output.dto';
import { IntersectionType } from '@nestjs/swagger';
import { TaskCreateDto } from './task-create.dto';

export class TaskOutputDto extends IntersectionType(TaskCreateDto, BaseOutputDto) {}
