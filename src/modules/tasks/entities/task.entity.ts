import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '@common/entities/base.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { StatusEnum } from '../enums/status.enum';
import { UserEntity } from '../../users/entities/user.entity'; // Caminho correto
import { Types } from 'mongoose';

export type TaskDocument = TaskEntity & Document;

@Schema({ timestamps: true, collection: 'tasks' })
export class TaskEntity extends BaseEntity {
    @Prop({ required: true, type: Types.ObjectId, ref: UserEntity.name })
    userId: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true, default: '' })
    description: string;

    @Prop({ required: true, enum: Object.values(StatusEnum), default: StatusEnum.OPEN })
    status: StatusEnum;

    @Prop({ required: true, type: Date })
    duedate: Date;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
TaskSchema.plugin(mongoosePaginate);
