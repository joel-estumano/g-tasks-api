import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskEntity, TaskSchema } from './entities/task.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: TaskEntity.name, schema: TaskSchema }])],
    providers: [TasksService],
    controllers: [TasksController],
})
export class TasksModule {}
