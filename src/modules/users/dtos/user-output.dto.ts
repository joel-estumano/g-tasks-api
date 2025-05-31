import { BaseOutputDto } from '@common/dtos/base-output.dto';
import { IntersectionType, OmitType } from '@nestjs/swagger';
import { UserCreateDto } from './user-create.dto';

export class UserOutputDto extends IntersectionType(OmitType(UserCreateDto, ['password'] as const), BaseOutputDto) {}
