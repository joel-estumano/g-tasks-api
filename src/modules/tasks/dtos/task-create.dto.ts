import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusEnum } from '../enums/status.enum';

export class TaskCreateDto {
    @ApiProperty({
        description: 'Unique identifier of the user who owns the task',
        example: '6838f7920ac32a6299091004',
    })
    @IsNotEmpty()
    @IsString()
    user: string;

    @ApiProperty({
        description: 'Title of the task',
        example: 'Complete project report',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'Detailed description of the task',
        example: 'Prepare and submit the final project report to the manager.',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Current status of the task',
        enum: StatusEnum,
        example: StatusEnum.OPEN,
        default: StatusEnum.OPEN,
        required: false,
    })
    @IsNotEmpty()
    @IsEnum(StatusEnum)
    status: StatusEnum;

    @ApiProperty({
        description: 'Due date for task completion',
        example: '2025-06-01T12:00:00.000Z',
    })
    @IsNotEmpty()
    @IsDateString()
    duedate: Date;
}
