import { ApiProperty } from '@nestjs/swagger';

export class BaseOutputDto {
    @ApiProperty({
        description: 'Unique identifier for the document',
        example: '60d21b4667d0d8992e610c85',
    })
    _id: string;

    @ApiProperty({
        description: 'Indicates whether the document is active',
        example: true,
    })
    active: boolean;

    @ApiProperty({
        description: 'Date when the document was created',
        example: '2023-04-06T11:54:03.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the document was last updated',
        example: '2023-05-30T12:20:00.000Z',
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'Version number of the document',
        example: 0,
    })
    __v: number;
}
