import { comparePassword } from './utils';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserCreateDto } from './dtos/user-create.dto';
import { UserDocument, UserEntity, UserKeys } from './entities/user.entity';
import { UserProfileDocument, UserProfileEntity, UserProfileKeys } from '../user-profiles/entities/user-profile.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserEntity.name)
        private readonly model: Model<UserDocument>,
        @InjectModel(UserProfileEntity.name)
        private readonly profileModel: Model<UserProfileDocument>,
    ) {}

    async create(dto: UserCreateDto): Promise<UserDocument> {
        const session = await this.model.db.startSession();
        session.startTransaction(); // Inicia a transação

        try {
            // Criar o usuário
            const user = new this.model(dto);
            await user.save({ session }); // O middleware `pre('save')` no UserSchema cuidará da criptografia da senha

            // Criar o perfil vinculado ao usuário
            const userProfile: Pick<UserProfileDocument, UserProfileKeys> = new this.profileModel({
                userId: user._id,
            });
            await userProfile.save({ session });

            await session.commitTransaction(); // Confirma a transação

            return user;
        } catch (error: unknown) {
            await session.abortTransaction(); // Rollback transaction
            if (error instanceof BadRequestException) {
                throw error; // Maintain specific validation error
            }
            if (error instanceof Error) {
                throw new InternalServerErrorException(`Error creating user and profile: ${error.message}`);
            }
            throw new InternalServerErrorException('Unexpected error occurred while creating user and profile.');
        } finally {
            await session.endSession(); // Ensure session is closed
        }
    }

    async delete(userId: string): Promise<void> {
        const session = await this.model.db.startSession();
        session.startTransaction();

        try {
            if (!Types.ObjectId.isValid(userId)) {
                throw new NotFoundException('Invalid user ID format.');
            }

            const objectId = new Types.ObjectId(userId);

            // Delete user profile first
            const profileDeletion = await this.profileModel.deleteOne({ userId: objectId } as Pick<UserProfileDocument, 'userId'>, { session });
            if (profileDeletion.deletedCount === 0) {
                throw new NotFoundException(`User profile for user ID ${userId} not found.`);
            }

            // Delete user
            const userDeletion = await this.model.deleteOne({ _id: objectId }, { session });
            if (userDeletion.deletedCount === 0) {
                throw new NotFoundException(`User with ID ${userId} not found.`);
            }

            await session.commitTransaction();
        } catch (error: unknown) {
            await session.abortTransaction();

            if (error instanceof NotFoundException) {
                throw error; // Preserve specific 404 errors
            }

            throw new InternalServerErrorException('Unexpected error occurred while deleting user and profile.');
        } finally {
            await session.endSession(); // Ensure session is properly closed
        }
    }

    /*  async create(dto: UserCreateDto): Promise<UserDocument> {
        const userModel = new this.model(dto);
        return await userModel.save(); // O middleware `pre('save')` no UserSchema cuidará da criptografia da senha
    } */

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
