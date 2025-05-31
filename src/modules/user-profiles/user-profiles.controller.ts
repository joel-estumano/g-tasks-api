import { ApiAuth } from '@common/decorators/api-bearer.decorator';
import { Controller, Get, Param } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { UserProfileDocument } from './entities/user-profile.entity';
import { UserProfileOutputDto } from './dtos/user-profile-output.dto';
import { UserOutputDto } from '../users/dtos/user-output.dto';

@Controller('user-profiles')
@ApiAuth()
export class UserProfilesController {
    constructor(private service: UserProfilesService) {}

    @Get('user/:userId')
    @ApiOperation({
        summary: 'Retrieve user profile by user ID',
        description: 'Fetches the user profile associated with the given user ID.',
    })
    @ApiOkResponse({
        description: 'User profile retrieved successfully.',
        type: () => {
            class UserIdDto {
                @ApiProperty({
                    description: 'Detailed information about the user',
                    type: UserOutputDto,
                })
                userId: UserOutputDto;
            }
            return IntersectionType(OmitType(UserProfileOutputDto, ['userId'] as const), UserIdDto);
        },
    })
    @ApiNotFoundResponse({
        description: 'User profile not found.',
    })
    @ApiBadRequestResponse({
        description: 'Invalid user ID format.',
    })
    async findByUserId(@Param('userId') userId: string): Promise<UserProfileDocument | null> {
        return await this.service.findByUserId(userId);
    }
}
