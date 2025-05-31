import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UserProfilesModule } from '../user-profiles/user-profiles.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]), UserProfilesModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
