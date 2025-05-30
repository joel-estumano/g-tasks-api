import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
    @ApiProperty({
        description: 'user name',
        example: 'Joe',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'email',
        example: 'mail@mail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password',
        example: 'xptgh1',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
