import { IntersectionType } from '@nestjs/swagger';
import { TaskCreateDto } from './task-create.dto';

export class TaskOutputDto extends IntersectionType(TaskCreateDto) {}
