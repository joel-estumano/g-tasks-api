import { BaseOutputDto } from '@common/dtos/base-output.dto';
import { IntersectionType } from '@nestjs/swagger';
import { UserProfileCreateDto } from './user-profile-create.dto';

export class UserProfileOutputDto extends IntersectionType(UserProfileCreateDto, BaseOutputDto) {}
