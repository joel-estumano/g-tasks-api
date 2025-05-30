import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserDocument } from './entities/user.entity';
import { Public } from '../auth/decorators/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Public()
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
