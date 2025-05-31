import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserDocument } from './entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';
import { UserOutputDto } from './dtos/user-output.dto';
import { ApiAuth } from '@common/decorators/api-bearer.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Public()
    @Post()
    @ApiOperation({
        summary: 'Create a new user',
        description: 'Creates a new user account with the provided details.',
    })
    @ApiCreatedResponse({
        description: 'The user was successfully created.',
        type: UserOutputDto,
    })
    @ApiBadRequestResponse({
        description: 'Invalid input data. Check the provided information.',
    })
    async create(@Body() dto: UserCreateDto): Promise<UserDocument> {
        return await this.service.create(dto);
    }

    @ApiAuth()
    @Delete(':id')
    @ApiOperation({
        summary: 'Delete a user',
        description: 'Deletes a user account along with their associated profile.',
    })
    @ApiNoContentResponse({ description: 'User successfully deleted.' })
    @ApiBadRequestResponse({ description: 'Invalid user ID.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    async delete(@Param('id') userId: string): Promise<void> {
        await this.service.delete(userId);
    }
}
