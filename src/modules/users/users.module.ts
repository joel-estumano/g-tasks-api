import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';

@Module({
    controllers: [UsersController],
    imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
    providers: [UsersService],
})
export class UsersModule {}
