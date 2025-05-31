import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '@common/entities/base.entity';
import { Document, Types } from 'mongoose';
import { UserProfileStatusEnum } from '../enums/user-profile-status.enum';
import { UserEntity } from '../../users/entities/user.entity';

export type UserProfileDocument = UserProfileEntity & Document;
export type UserProfileKeys = keyof UserProfileDocument;

@Schema({ timestamps: true, collection: 'user-profiles' })
export class UserProfileEntity extends BaseEntity {
    @Prop({ required: false, default: 'Hi, I`m using G Tasks!' })
    bio: string;

    @Prop({ required: false, default: '' })
    avatarUrl: string;

    @Prop({ required: false, enum: Object.values(UserProfileStatusEnum), default: UserProfileStatusEnum.OFFLINE })
    status: UserProfileStatusEnum;

    @Prop({ required: true, type: Types.ObjectId, ref: UserEntity.name, unique: true }) // unique, 🚀 Isso impede a criação de um segundo perfil para um mesmo usuário
    userId: Types.ObjectId;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfileEntity);
