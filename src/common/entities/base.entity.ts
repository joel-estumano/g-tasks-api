import { Prop } from '@nestjs/mongoose';

export abstract class BaseEntity {
    @Prop({ required: true, default: true, select: false })
    active: boolean;
}
