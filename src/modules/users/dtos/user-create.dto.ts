import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
    @ApiProperty({
        description: "User's full name",
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "User's email address",
        example: 'john.doe@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "User's password (minimum length of 6 characters)",
        example: 'EeT31BXhZf',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
