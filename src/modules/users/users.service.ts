import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserCreateDto } from './dtos/user-create.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly model: Model<UserDocument>,
    ) {}

    async create(dto: UserCreateDto): Promise<UserDocument> {
        const createdUser = new this.model(dto);
        return createdUser.save(); // O middleware `pre('save')` no UserSchema cuidará da criptografia da senha
    }
}
