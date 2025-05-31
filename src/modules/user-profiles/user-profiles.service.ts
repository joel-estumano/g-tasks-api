import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserProfileDocument, UserProfileEntity } from './entities/user-profile.entity';

@Injectable()
export class UserProfilesService {
    constructor(
        @InjectModel(UserProfileEntity.name)
        private readonly model: Model<UserProfileDocument>,
    ) {}

    async findByUserId(userId: string): Promise<UserProfileDocument> {
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user ID format');
        }

        const profile = await this.model
            .findOne({ userId: new Types.ObjectId(userId) })
            .populate('userId')
            .exec();

        if (!profile) {
            throw new NotFoundException(`User profile with ID ${userId} not found`);
        }

        return profile;
    }
}
