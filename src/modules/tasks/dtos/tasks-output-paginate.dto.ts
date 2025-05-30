import { PaginateOutputDto } from '@common/dtos/paginate-output.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TaskOutputDto } from './task-output.dto';

export class TasksOutputPaginateDto extends PaginateOutputDto {
    @ApiProperty({
        description: 'List of tasks in the current paginated result',
        type: TaskOutputDto,
        isArray: true,
    })
    docs: TaskOutputDto[];
}
