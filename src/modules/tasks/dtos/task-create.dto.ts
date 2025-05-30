import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusEnum } from '../enums/status.enum';

export class TaskCreateDto {
    @ApiProperty({
        description: 'user id',
        example: '6838f7920ac32a6299091004',
    })
    @IsNotEmpty()
    @IsString()
    user: string;

    @ApiProperty({
        description: 'task title',
        example: 'work validation',
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        description: 'task description',
        example: 'details of work',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'task status',
        enum: StatusEnum,
        example: StatusEnum.OPEN,
    })
    @IsNotEmpty()
    @IsEnum(StatusEnum)
    status: StatusEnum;

    @ApiProperty({
        description: 'due date',
        example: '2025-06-01T12:00:00.000Z',
    })
    @IsDate()
    duedate: Date;
}
