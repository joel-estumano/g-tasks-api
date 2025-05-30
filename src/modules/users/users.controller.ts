import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserDocument } from './entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';
import { UserOutputDto } from './dtos/user-output.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Public()
    @Post('create')
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
}
