import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Document } from 'mongoose';
import { encryptPassword } from '../utils';

export type UserDocument = UserEntity & Document;

@Schema({ timestamps: true, collection: 'users' })
export class UserEntity extends BaseEntity {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

// Middleware do Mongoose para criptografar antes de salvar um usuário novo
UserSchema.pre('save', function (next) {
    const user = this as UserDocument;
    if (user.isModified('password')) {
        user.password = encryptPassword(user.password);
    }
    next();
});

// Middleware para criptografar antes de uma atualização
UserSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate() as Partial<UserDocument>;
    if (update.password) {
        update.password = encryptPassword(update.password);
    }
    this.setUpdate(update);
    next();
});
