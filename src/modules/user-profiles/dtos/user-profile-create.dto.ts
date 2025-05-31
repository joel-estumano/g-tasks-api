import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { UserProfileStatusEnum } from '../enums/user-profile-status.enum';

export class UserProfileCreateDto {
    @ApiProperty({
        description: 'A short biography about the user',
        example: 'Software engineer passionate about AI and web development.',
    })
    @IsOptional()
    @IsString()
    bio: string;

    @ApiProperty({
        description: 'URL of the user avatar image',
        example: 'https://example.com/avatar.png',
    })
    @IsOptional()
    @IsString()
    avatarUrl: string;

    @ApiProperty({
        description: 'Current status of the user profile',
        enum: UserProfileStatusEnum,
        example: UserProfileStatusEnum.AVAILABLE,
        default: UserProfileStatusEnum.AVAILABLE,
        required: false,
    })
    @IsOptional()
    @IsEnum(UserProfileStatusEnum)
    status: UserProfileStatusEnum;

    @ApiProperty({
        description: 'Unique identifier of the user associated with the profile',
        example: '60d21b4667d0d8992e610c85',
    })
    @IsNotEmpty()
    @IsString()
    userId: Types.ObjectId;
}
