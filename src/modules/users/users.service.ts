import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity, UserKeys } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserCreateDto } from './dtos/user-create.dto';
import { comparePassword } from './utils';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly model: Model<UserDocument>,
    ) {}

    async create(dto: UserCreateDto): Promise<UserDocument> {
        const userModel = new this.model(dto);
        return await userModel.save(); // O middleware `pre('save')` no UserSchema cuidará da criptografia da senha
    }

    /**
     * Finds a user in the database based on the specified property.
     *
     * @param {UserKeys} prop - The property to search by (e.g., 'email', 'name').
     * @param {string} arg - The value of the property to find.
     * @param {UserKeys[] | null} select - Optional fields to return in the query.
     * @returns {Promise<UserDocument | null>} - Returns a user if found, or `null` otherwise.
     *
     * @example
     * ```typescript
     * const user = await usersService.findOne('email', 'user@email.com', ['name', 'email']);
     * console.log(user);
     * ```
     */
    async findOne(prop: UserKeys, arg: string, select: UserKeys[] | null = null): Promise<UserDocument | null> {
        if (!select || !select.length) {
            return await this.model.findOne({ [prop]: arg });
        }
        return await this.model
            .findOne({ [prop]: arg })
            .select(select.join(' '))
            .exec();
    }

    validatePassword(storedPassword: string, suppliedPassword: string): boolean {
        return comparePassword(storedPassword, suppliedPassword);
    }
}
