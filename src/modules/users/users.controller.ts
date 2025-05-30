import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserDocument } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post('create')
    @ApiOperation({
        summary: 'create a new user',
        description: 'create a new user',
    })
    @ApiCreatedResponse({ description: 'successful request' })
    async create(@Body() dto: UserCreateDto): Promise<UserDocument> {
        return await this.service.create(dto);
    }
}
